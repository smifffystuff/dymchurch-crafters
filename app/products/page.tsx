import ProductsClient from './ProductsClient'
import { fetchProducts, fetchCrafters } from '@/lib/api'

export const metadata = {
  title: 'All Products | Dymchurch Crafters',
  description: 'Browse handmade crafts from local artisans in Dymchurch, Hythe, and Romney Marsh',
}

export default async function ProductsPage() {
  // Fetch initial data on the server
  const [productsResponse, craftersResponse] = await Promise.all([
    fetchProducts(),
    fetchCrafters(),
  ])

  const initialProducts = productsResponse.success && productsResponse.data ? productsResponse.data : []
  const crafters = craftersResponse.success && craftersResponse.data ? craftersResponse.data : []

  return (
    <ProductsClient
      initialProducts={initialProducts}
      crafters={crafters}
    />
  )
}

