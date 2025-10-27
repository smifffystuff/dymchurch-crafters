import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mockProducts } from '@/data/mockData'

// Get featured products
const featuredProducts = mockProducts.filter(p => p.featured)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Local Handmade Crafts
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
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
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">by {product.crafter}</p>
                  <p className="text-xl font-bold text-primary-600">£{product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Other'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="bg-primary-50 rounded-lg p-6 text-center hover:bg-primary-100 transition"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="font-semibold text-gray-900">{category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
