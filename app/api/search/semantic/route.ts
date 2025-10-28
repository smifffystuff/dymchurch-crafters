import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { generateEmbedding } from '@/lib/openai'

// POST /api/search/semantic - Perform semantic search
export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { query, limit = 20 } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Query is required',
        },
        { status: 400 }
      )
    }

    // Generate embedding for the search query
    console.log(`Generating embedding for query: "${query}"`)
    const queryEmbedding = await generateEmbedding(query)

    // Perform vector search using MongoDB Atlas Vector Search
    // Note: This requires a vector search index to be created in MongoDB Atlas
    const results = await Product.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index', // Name of your Atlas Vector Search index
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 100, // Number of candidates to consider
          limit: limit, // Number of results to return
        },
      },
      {
        $lookup: {
          from: 'crafters',
          localField: 'crafterId',
          foreignField: '_id',
          as: 'crafterInfo',
        },
      },
      {
        $unwind: {
          path: '$crafterInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          crafterId: {
            _id: '$crafterInfo._id',
            name: '$crafterInfo.name',
            specialty: '$crafterInfo.specialty',
            location: '$crafterInfo.location',
          },
          score: { $meta: 'vectorSearchScore' }, // Relevance score
        },
      },
      {
        $project: {
          crafterInfo: 0,
          embedding: 0, // Don't return the embedding in results
        },
      },
    ])

    console.log(`Found ${results.length} semantic search results`)

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      data: results,
    })
  } catch (error: any) {
    console.error('Error performing semantic search:', error)
    
    // Check if error is due to missing vector index
    if (error.message?.includes('vector') || error.code === 40324) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vector search index not configured. Please set up Atlas Vector Search index.',
          details: error.message,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform semantic search',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
