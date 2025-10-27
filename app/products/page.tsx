import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/lib/api'

export default async function ProductsPage() {
  // Fetch all products from MongoDB
  const response = await fetchProducts()
  const products = response.success && response.data ? response.data : []

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Products</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>All Categories</option>
            <option>Jewelry</option>
            <option>Pottery</option>
            <option>Textiles</option>
            <option>Woodwork</option>
            <option>Art</option>
            <option>Other</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 mb-4">No products found.</p>
              <p className="text-sm text-gray-500">
                Run <code className="bg-gray-100 px-2 py-1 rounded">npm run seed</code> to add sample data.
              </p>
            </div>
          ) : (
            products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
