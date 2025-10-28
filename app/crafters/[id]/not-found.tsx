import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Crafter Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the crafter you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/crafters"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            View All Crafters
          </Link>
          <Link
            href="/products"
            className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
