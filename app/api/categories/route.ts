import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Category } from '@/lib/models/Category'

// GET /api/categories - Get all active categories
export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .lean()

    // Serialize the data
    const serializedCategories = categories.map((category: any) => ({
      _id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      displayOrder: category.displayOrder,
      isActive: category.isActive,
      createdAt: category.createdAt?.toISOString(),
      updatedAt: category.updatedAt?.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: serializedCategories,
    })
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
