import mongoose from 'mongoose';

export interface IUser {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: 'customer' | 'crafter' | 'admin';
  onboardingComplete: boolean;
  crafterId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    imageUrl: String,
    role: {
      type: String,
      enum: ['customer', 'crafter', 'admin'],
      default: 'customer',
    },
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
    crafterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crafter',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
