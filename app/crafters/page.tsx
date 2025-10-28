import Link from 'next/link'
import Image from 'next/image'
import { fetchCrafters } from '@/lib/api'

export default async function CraftersPage() {
  // Fetch crafters from MongoDB
  const response = await fetchCrafters()
  const crafters = response.success && response.data ? response.data : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Meet Our Crafters</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Talented artisans from Dymchurch, Hythe, and Romney Marsh creating beautiful handmade items
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {crafters.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No crafters found.</p>
            <p className="text-sm text-gray-500">
              Run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run seed</code> to add sample data.
            </p>
          </div>
        ) : (
          crafters.map((crafter: any) => (
            <Link
              key={crafter._id}
              href={`/crafters/${crafter._id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                    {crafter.profileImage ? (
                      <Image
                        src={crafter.profileImage}
                        alt={crafter.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {crafter.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">{crafter.specialty}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">📍 {crafter.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{crafter.bio}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{crafter.productsCount} products</span>
                  <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                    View Profile →
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
