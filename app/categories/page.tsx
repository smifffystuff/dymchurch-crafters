import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { Category } from '@/lib/models/Category'

export const metadata = {
  title: 'Shop by Category | Dymchurch Crafters',
  description: 'Browse handmade crafts organized by category. Jewelry, pottery, textiles, woodwork, art, and more from local artisans.',
}

export default async function CategoriesPage() {
  // Connect to database and get categories with product counts
  await connectDB()
  
  // Fetch all active categories
  const categories = await Category.find({ isActive: true })
    .sort({ displayOrder: 1, name: 1 })
    .lean()

  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category: any) => {
      const count = await Product.countDocuments({ category: category.name })
      return {
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        productCount: count
      }
    })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Shop by Category</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Explore handmade crafts organized by type
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCounts.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition group"
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {category.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
              </span>
              <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                Browse →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
