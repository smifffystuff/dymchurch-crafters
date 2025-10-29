'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function OrderConfirmationClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [order, setOrder] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      // Payment was successful - fetch order details
      fetchOrderDetails();
      
      // Clear cart from localStorage and context
      clearCart();
      localStorage.removeItem('cart');
      localStorage.removeItem('deliveryInfo');
      localStorage.removeItem('customerInfo');
    } else if (redirectStatus === 'failed') {
      setStatus('error');
      setErrorMessage('Your payment was not successful. Please try again.');
    } else {
      setStatus('error');
      setErrorMessage('Invalid payment status.');
    }
  }, [searchParams, orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data);
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to load order details');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setStatus('error');
      setErrorMessage('Failed to load order details');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse text-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-8">{errorMessage}</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/cart"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
                >
                  Return to Cart
                </Link>
                <Link
                  href="/"
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We've sent a confirmation email to{' '}
              <span className="font-semibold">{order?.customerEmail}</span>
            </p>
          </div>

          {/* Order Details */}
          {order && (
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Details
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold">{order.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Items Ordered
                </h3>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-start bg-gray-50 rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          By: {item.crafterName}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Delivery Method
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 capitalize">
                    {order.deliveryOption.replace('-', ' ')}
                  </p>
                  {order.deliveryAddress && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{order.deliveryAddress.street}</p>
                      <p>
                        {order.deliveryAddress.city}, {order.deliveryAddress.postcode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>£{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span>£{order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Paid:</span>
                    <span className="text-orange-600">
                      £{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👨‍🎨</span>
                <span>Our crafters will prepare your items</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📦</span>
                <span>You'll be notified when your order is ready</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/crafters"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Browse Crafters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
