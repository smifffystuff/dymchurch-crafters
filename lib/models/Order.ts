import mongoose, { Schema, Document, Model } from 'mongoose'

// Order Interface
export interface IOrder extends Document {
  orderNumber: string
  customerId?: string
  customerEmail: string
  customerName: string
  items: {
    productId: mongoose.Types.ObjectId
    productName: string
    quantity: number
    price: number
    crafterId: mongoose.Types.ObjectId
    crafterName: string
  }[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryOption: 'pickup' | 'local-delivery' | 'delivery' | 'shipping'
  deliveryAddress?: {
    street: string
    city: string
    postcode: string
  }
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed'
  paymentIntentId?: string
  stripeChargeId?: string
  paidAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Order Schema
const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: false, // Will be auto-generated
      unique: true,
    },
    customerId: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        crafterId: {
          type: Schema.Types.ObjectId,
          ref: 'Crafter',
          required: true,
        },
        crafterName: {
          type: String,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryOption: {
      type: String,
      enum: ['pickup', 'local-delivery', 'delivery', 'shipping'],
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      postcode: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
      required: false,
      index: true,
    },
    stripeChargeId: {
      type: String,
      required: false,
    },
    paidAt: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ customerId: 1 })
OrderSchema.index({ customerEmail: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

// Pre-save hook to generate order number
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    // Format: ORD-YYYYMMDD-XXXX (e.g., ORD-20251029-0001)
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Use a more reliable method to get the next sequential number
    // Find the highest order number for today
    const todayPattern = new RegExp(`^ORD-${dateStr}-`);
    const lastOrder = await (this.constructor as Model<IOrder>)
      .findOne({ orderNumber: todayPattern })
      .sort({ orderNumber: -1 })
      .select('orderNumber')
      .lean();
    
    let sequential = 1;
    if (lastOrder && lastOrder.orderNumber) {
      // Extract the sequential part and increment
      const lastSequential = parseInt(lastOrder.orderNumber.split('-')[2]);
      sequential = lastSequential + 1;
    }
    
    this.orderNumber = `ORD-${dateStr}-${String(sequential).padStart(4, '0')}`;
  }
  next();
});

// Export model
export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
