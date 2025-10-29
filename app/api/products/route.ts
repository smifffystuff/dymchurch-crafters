import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { Crafter } from '@/lib/models/Crafter' // Import Crafter model for populate to work

// GET /api/products - Get all products with search and filtering
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const crafterId = searchParams.get('crafterId')
    const sortBy = searchParams.get('sortBy') || 'newest'

    let query: any = {}

    // Category filter
    if (category && category !== 'all') {
      query.category = category
    }

    // Featured filter
    if (featured === 'true') {
      query.featured = true
    }

    // Crafter filter
    if (crafterId) {
      query.crafterId = crafterId
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) {
        query.price.$gte = Number.parseFloat(minPrice)
      }
      if (maxPrice) {
        query.price.$lte = Number.parseFloat(maxPrice)
      }
    }

    // Text search (search in name, description, materials)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { materials: { $regex: search, $options: 'i' } },
      ]
    }

    // Determine sort order
    let sortOptions: any
    
    switch (sortBy) {
      case 'price-asc':
        sortOptions = { price: 1 }
        break
      case 'price-desc':
        sortOptions = { price: -1 }
        break
      case 'name-asc':
        sortOptions = { name: 1 }
        break
      case 'newest':
      default:
        sortOptions = { createdAt: -1 }
        break
    }

    const products = await Product.find(query)
      .populate('crafterId', 'name specialty location')
      .select('-embedding') // Exclude large embedding field from response
      .sort(sortOptions)
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
