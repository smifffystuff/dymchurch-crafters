import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate an embedding vector for a given text using OpenAI
 * @param text The text to generate an embedding for
 * @returns Array of numbers representing the embedding vector (1536 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small', // Cost-effective model (1536 dimensions)
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw new Error('Failed to generate embedding')
  }
}

/**
 * Generate a combined text representation of a product for embedding
 * @param product Product data
 * @returns Combined text string
 */
export function generateProductText(product: {
  name: string
  description: string
  materials: string
  category: string
}): string {
  // Combine relevant product information
  return `${product.name}. ${product.description}. Made from ${product.materials}. Category: ${product.category}.`
}

/**
 * Generate an embedding for a product
 * @param product Product data
 * @returns Embedding vector
 */
export async function generateProductEmbedding(product: {
  name: string
  description: string
  materials: string
  category: string
}): Promise<number[]> {
  const text = generateProductText(product)
  return generateEmbedding(text)
}
