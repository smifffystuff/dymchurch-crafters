import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { generateProductEmbedding } from '@/lib/openai'
import mongoose from 'mongoose'

// POST /api/embeddings/generate - Generate embeddings for all products
export async function POST(request: Request) {
  try {
    await connectDB()

    // Get all products without embeddings (use select to include embedding field in check)
    const products = await Product.find({ embedding: { $exists: false } })
      .select('+embedding') // Explicitly include embedding field
      .lean()

    if (products.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All products already have embeddings',
        count: 0,
      })
    }

    console.log(`Generating embeddings for ${products.length} products...`)

    let successCount = 0
    let errorCount = 0

    // Generate embeddings for each product
    for (const product of products) {
      try {
        const embedding = await generateProductEmbedding({
          name: product.name,
          description: product.description,
          materials: product.materials,
          category: product.category,
        })

        console.log(`Generated embedding for ${product.name}, length: ${embedding.length}`)

        // Use native MongoDB collection to bypass Mongoose schema restrictions
        const db = mongoose.connection.db
        if (!db) throw new Error('Database connection not available')
        
        const result = await db.collection('products').updateOne(
          { _id: product._id },
          { 
            $set: { embedding: embedding },
            $currentDate: { updatedAt: true }
          }
        )

        if (result.modifiedCount > 0) {
          successCount++
          console.log(`✓ Saved embedding for: ${product.name}`)
        } else {
          console.warn(`⚠ Warning: Embedding generated but not saved for: ${product.name}`)
          errorCount++
        }
      } catch (error) {
        console.error(`✗ Failed to generate embedding for ${product.name}:`, error)
        errorCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Generated ${successCount} embeddings successfully`,
      successCount,
      errorCount,
      total: products.length,
    })
  } catch (error) {
    console.error('Error generating embeddings:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate embeddings',
      },
      { status: 500 }
    )
  }
}

// GET /api/embeddings/generate - Check embedding status
export async function GET(request: Request) {
  try {
    await connectDB()

    const totalProducts = await Product.countDocuments()
    
    // Count products with embeddings (embedding field exists and is not null/empty)
    const productsWithEmbeddings = await Product.countDocuments({
      embedding: { $exists: true, $ne: null, $not: { $size: 0 } }
    })
    
    const productsWithoutEmbeddings = totalProducts - productsWithEmbeddings

    // Get sample product to debug
    const sampleProduct = await Product.findOne().select('name embedding').lean()
    const hasEmbeddingField = sampleProduct && 'embedding' in sampleProduct
    const embeddingLength = sampleProduct?.embedding?.length || 0

    return NextResponse.json({
      success: true,
      total: totalProducts,
      withEmbeddings: productsWithEmbeddings,
      withoutEmbeddings: productsWithoutEmbeddings,
      percentComplete: totalProducts > 0 
        ? Math.round((productsWithEmbeddings / totalProducts) * 100) 
        : 0,
      debug: {
        sampleProductHasEmbedding: hasEmbeddingField,
        sampleEmbeddingLength: embeddingLength,
      }
    })
  } catch (error) {
    console.error('Error checking embedding status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check embedding status',
      },
      { status: 500 }
    )
  }
}
