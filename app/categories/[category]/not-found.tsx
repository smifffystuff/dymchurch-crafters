import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import connectDB from '@/lib/mongodb'
import { Category } from '@/lib/models/Category'

export default async function NotFound() {
  // Fetch active categories
  await connectDB()
  const categories = await Category.find({ isActive: true })
    .select('name slug')
    .sort({ displayOrder: 1 })
    .lean()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Category Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn&apos;t find the category you&apos;re looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/categories"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <Search className="w-5 h-5" />
            Browse All Categories
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Available Categories:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat: any) => (
              <Link
                key={cat._id.toString()}
                href={`/categories/${cat.slug}`}
                className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
