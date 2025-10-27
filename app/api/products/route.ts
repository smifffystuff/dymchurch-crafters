import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { Crafter } from '@/lib/models/Crafter' // Import Crafter model for populate to work

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let query: any = {}

    if (category) {
      query.category = category
    }

    if (featured === 'true') {
      query.featured = true
    }

    const products = await Product.find(query)
      .populate('crafterId', 'name specialty location')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product (future use)
export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const product = await Product.create(body)

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    )
  }
}
