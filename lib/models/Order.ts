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
  deliveryOption: 'pickup' | 'delivery' | 'shipping'
  deliveryAddress?: {
    street: string
    city: string
    postcode: string
  }
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentIntentId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Order Schema
const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
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
      enum: ['pickup', 'delivery', 'shipping'],
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
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
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

// Export model
export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
