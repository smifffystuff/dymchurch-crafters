import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  description: string
  icon: string
  displayOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
    },
    icon: {
      type: String,
      required: [true, 'Category icon is required'],
      default: '✨',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes
CategorySchema.index({ slug: 1 })
CategorySchema.index({ displayOrder: 1 })
CategorySchema.index({ isActive: 1 })

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
