import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Jewelry',
      slug: 'jewelry',
      description: 'Handcrafted necklaces, bracelets, earrings, and rings',
      productCount: 34,
      icon: '💍'
    },
    {
      name: 'Pottery',
      slug: 'pottery',
      description: 'Ceramic mugs, bowls, plates, and decorative items',
      productCount: 28,
      icon: '🏺'
    },
    {
      name: 'Textiles',
      slug: 'textiles',
      description: 'Knitted scarves, blankets, bags, and clothing',
      productCount: 41,
      icon: '🧶'
    },
    {
      name: 'Woodwork',
      slug: 'woodwork',
      description: 'Wooden bowls, furniture, toys, and decorative pieces',
      productCount: 19,
      icon: '🪵'
    },
    {
      name: 'Art',
      slug: 'art',
      description: 'Paintings, prints, illustrations, and mixed media',
      productCount: 52,
      icon: '🎨'
    },
    {
      name: 'Other',
      slug: 'other',
      description: 'Leather goods, candles, soaps, and more unique items',
      productCount: 23,
      icon: '✨'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-700">
            Explore handmade crafts organized by type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition group"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.productCount} products</span>
                <span className="text-primary-600 font-medium group-hover:underline">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
