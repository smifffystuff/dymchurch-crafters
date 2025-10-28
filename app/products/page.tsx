import ProductsClient from './ProductsClient'
import { fetchProducts, fetchCrafters } from '@/lib/api'

export const metadata = {
  title: 'All Products | Dymchurch Crafters',
  description: 'Browse handmade crafts from local artisans in Dymchurch, Hythe, and Romney Marsh',
}

async function fetchCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, data: [] }
  }
}

export default async function ProductsPage() {
  // Fetch initial data on the server
  const [productsResponse, craftersResponse, categoriesResponse] = await Promise.all([
    fetchProducts(),
    fetchCrafters(),
    fetchCategories(),
  ])

  const initialProducts = productsResponse.success && productsResponse.data ? productsResponse.data : []
  const crafters = craftersResponse.success && craftersResponse.data ? craftersResponse.data : []
  const categories = categoriesResponse.success && categoriesResponse.data ? categoriesResponse.data : []

  return (
    <ProductsClient
      initialProducts={initialProducts}
      crafters={crafters}
      categories={categories}
    />
  )
}
