import mongoose, { Schema, Document, Model } from 'mongoose'

// Crafter Interface
export interface ICrafter extends Document {
  name: string
  specialty: string
  location: string
  bio: string
  email?: string
  phone?: string
  profileImage?: string
  verified: boolean
  productsCount: number
  createdAt: Date
  updatedAt: Date
}

// Crafter Schema
const CrafterSchema = new Schema<ICrafter>(
  {
    name: {
      type: String,
      required: [true, 'Crafter name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      maxlength: [200, 'Specialty cannot exceed 200 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    productsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
CrafterSchema.index({ location: 1 })
CrafterSchema.index({ specialty: 1 })
CrafterSchema.index({ verified: 1 })

// Export model
export const Crafter: Model<ICrafter> =
  mongoose.models.Crafter || mongoose.model<ICrafter>('Crafter', CrafterSchema)
