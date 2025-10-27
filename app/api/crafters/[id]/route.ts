import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Crafter } from '@/lib/models/Crafter'
import { Product } from '@/lib/models/Product'

// GET /api/crafters/[id] - Get a single crafter with their products
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const crafter = await Crafter.findById(id).lean()

    if (!crafter) {
      return NextResponse.json(
        {
          success: false,
          error: 'Crafter not found',
        },
        { status: 404 }
      )
    }

    // Get crafter's products
    const products = await Product.find({ crafterId: id })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: {
        ...crafter,
        products,
      },
    })
  } catch (error) {
    console.error('Error fetching crafter:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch crafter',
      },
      { status: 500 }
    )
  }
}
