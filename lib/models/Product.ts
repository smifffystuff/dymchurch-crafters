import mongoose, { Schema, Document, Model } from 'mongoose'
// Import Crafter model to ensure it's registered before Product references it
import './Crafter'

// Product Interface
export interface IProduct extends Document {
  name: string
  price: number
  crafter: string
  crafterId: mongoose.Types.ObjectId
  category: string
  description: string
  materials: string
  dimensions?: string
  inStock: boolean
  featured: boolean
  images: string[]
  embedding?: number[] // OpenAI vector embedding for semantic search
  createdAt: Date
  updatedAt: Date
}

// Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    crafter: {
      type: String,
      required: [true, 'Crafter name is required'],
    },
    crafterId: {
      type: Schema.Types.ObjectId,
      ref: 'Crafter',
      required: [true, 'Crafter ID is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Other'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    materials: {
      type: String,
      required: [true, 'Materials are required'],
    },
    dimensions: {
      type: String,
      required: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: [],
    },
    embedding: {
      type: [Number],
      required: false,
      // Note: This is a large field (1536 numbers), but we need it to be settable
      // We'll explicitly exclude it in queries where we don't need it
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
ProductSchema.index({ category: 1 })
ProductSchema.index({ crafterId: 1 })
ProductSchema.index({ featured: 1 })
ProductSchema.index({ name: 'text', description: 'text', materials: 'text' })

// Export model
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
