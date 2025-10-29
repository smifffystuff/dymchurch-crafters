import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, delivery, customerEmail, customerName } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!delivery || !delivery.method) {
      return NextResponse.json(
        { error: 'Delivery information is required' },
        { status: 400 }
      );
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Verify products exist and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).lean();

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 404 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        crafterId: product.crafterId,
        crafterName: item.crafterName || 'Unknown Crafter',
      });
    }

    // Calculate delivery fee
    const deliveryFee = delivery.fee || 0;
    const total = subtotal + deliveryFee;

    // Check if there's an existing pending order for this customer with same items
    // This prevents duplicate orders if the user clicks checkout multiple times
    const existingOrder = await Order.findOne({
      customerEmail,
      paymentStatus: 'pending',
      total,
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } // Last 10 minutes
    }).sort({ createdAt: -1 });

    let order;
    let paymentIntent;

    if (existingOrder && existingOrder.paymentIntentId) {
      // Reuse existing order and payment intent
      order = existingOrder;
      paymentIntent = await stripe.paymentIntents.retrieve(existingOrder.paymentIntentId);
      
      // If payment intent is not in a usable state, create a new one
      if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'canceled') {
        paymentIntent = await stripe.paymentIntents.create({
          amount: formatAmountForStripe(total),
          currency: 'gbp',
          description: `Order ${order.orderNumber} - Dymchurch Crafters`,
          metadata: {
            orderId: String(order._id),
            orderNumber: order.orderNumber,
            customerEmail,
          },
          receipt_email: customerEmail,
          automatic_payment_methods: {
            enabled: true,
          },
        });
        
        order.paymentIntentId = paymentIntent.id;
        await order.save();
      }
    } else {
      // Create new order in database (pending status)
      try {
        order = await Order.create({
          customerEmail,
          customerName,
          items: orderItems,
          subtotal,
          deliveryFee,
          total,
          deliveryOption: delivery.method,
          deliveryAddress: delivery.address,
          status: 'pending',
          paymentStatus: 'pending',
        });
      } catch (err: any) {
        // Handle duplicate order number (race condition)
        if (err.code === 11000 && err.keyPattern?.orderNumber) {
          // Try to find the order that was just created
          const recentOrder = await Order.findOne({
            customerEmail,
            paymentStatus: 'pending',
            total,
            createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
          }).sort({ createdAt: -1 });
          
          if (recentOrder) {
            order = recentOrder;
            
            // Check if it has a payment intent
            if (recentOrder.paymentIntentId) {
              paymentIntent = await stripe.paymentIntents.retrieve(recentOrder.paymentIntentId);
              
              // Return existing payment intent if still usable
              if (paymentIntent.status !== 'succeeded' && paymentIntent.status !== 'canceled') {
                return NextResponse.json({
                  clientSecret: paymentIntent.client_secret,
                  orderId: String(order._id),
                  orderNumber: order.orderNumber,
                  amount: total,
                });
              }
            }
          } else {
            // If we can't find the order, throw the original error
            throw err;
          }
        } else {
          throw err;
        }
      }

      // Create Stripe Payment Intent
      paymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(total),
        currency: 'gbp',
        description: `Order ${order.orderNumber} - Dymchurch Crafters`,
        metadata: {
          orderId: String(order._id),
          orderNumber: order.orderNumber,
          customerEmail,
        },
        receipt_email: customerEmail,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Update order with payment intent ID
      order.paymentIntentId = paymentIntent.id;
      await order.save();
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: String(order._id),
      orderNumber: order.orderNumber,
      amount: total,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create payment intent',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
