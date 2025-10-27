import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Crafter } from '@/lib/models/Crafter'

// GET /api/crafters - Get all crafters
export async function GET() {
  try {
    await connectDB()

    const crafters = await Crafter.find({ verified: true })
      .sort({ name: 1 })
      .lean()

    return NextResponse.json({
      success: true,
      count: crafters.length,
      data: crafters,
    })
  } catch (error) {
    console.error('Error fetching crafters:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch crafters',
      },
      { status: 500 }
    )
  }
}
