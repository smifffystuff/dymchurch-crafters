import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mockCrafters } from '@/data/mockData'

export default function CraftersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Crafters</h1>
          <p className="text-xl text-gray-700">
            Talented artisans from Dymchurch, Hythe, and Romney Marsh creating beautiful handmade items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockCrafters.map((crafter) => (
            <Link
              key={crafter.id}
              href={`/crafters/${crafter.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600">
                      {crafter.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-1">{crafter.specialty}</p>
                    <p className="text-sm text-gray-500">📍 {crafter.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{crafter.bio}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">{crafter.productsCount} products</span>
                  <span className="text-primary-600 font-medium group-hover:underline">
                    View Profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
