import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/lib/api'

export default async function HomePage() {
  // Fetch featured products from MongoDB
  const response = await fetchProducts({ featured: true })
  const featuredProducts = response.success && response.data ? response.data : []

  return (
    <>
      <section className="bg-primary-50 dark:bg-primary-950 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Discover Local Handmade Crafts
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Supporting artisans in Dymchurch, Hythe, and Romney Marsh. 
              Find unique, handcrafted items made with love by your local community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Browse Products
              </Link>
              <Link 
                href="/crafters"
                className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition"
              >
                Meet the Crafters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Featured Products</h2>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No featured products yet.</p>
              <p className="text-sm text-gray-500">
                Run <code className="bg-gray-100 px-2 py-1 rounded">npm run seed</code> to add sample data.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Other'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6 text-center hover:bg-primary-100 dark:hover:bg-primary-900/50 transition"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-primary-200 dark:bg-primary-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
