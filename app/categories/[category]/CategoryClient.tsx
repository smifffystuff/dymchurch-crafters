'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ProductFilters, { FilterState } from '@/components/ProductFilters'
import { Loader2, ChevronRight, Home } from 'lucide-react'

interface CategoryClientProps {
  category: string
  categoryInfo: {
    title: string
    description: string
    emoji: string
  }
  initialProducts: any[]
  crafters: Array<{ _id: string; name: string }>
}

export default function CategoryClient({
  category,
  categoryInfo,
  initialProducts,
  crafters,
}: CategoryClientProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [totalProducts] = useState(initialProducts.length)

  const handleFilterChange = useCallback(async (filters: FilterState) => {
    setIsLoading(true)

    try {
      // If semantic search is enabled and there's a search query, use semantic search
      if (filters.useSemanticSearch && filters.search) {
        const response = await fetch('/api/search/semantic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: filters.search,
            limit: 50,
          }),
        })

        const data = await response.json()

        if (data.success) {
          // Apply client-side filters to semantic search results
          let results = data.data

          // Always filter by this category
          results = results.filter((p: any) => p.category === category)

          // Filter by crafter
          if (filters.crafterId) {
            results = results.filter((p: any) => p.crafterId._id === filters.crafterId)
          }

          // Filter by price
          if (filters.minPrice) {
            results = results.filter((p: any) => p.price >= parseFloat(filters.minPrice))
          }
          if (filters.maxPrice) {
            results = results.filter((p: any) => p.price <= parseFloat(filters.maxPrice))
          }

          // Sort results - 'relevance' keeps vector search order (already sorted by score)
          if (filters.sortBy && filters.sortBy !== 'newest' && filters.sortBy !== 'relevance') {
            results.sort((a: any, b: any) => {
              switch (filters.sortBy) {
                case 'price-asc':
                  return a.price - b.price
                case 'price-desc':
                  return b.price - a.price
                case 'name-asc':
                  return a.name.localeCompare(b.name)
                default:
                  return 0
              }
            })
          }

          setProducts(results)
          return
        }
      }

      // Otherwise use traditional search with category pre-filter
      const params = new URLSearchParams()
      
      // Always filter by this category
      params.append('category', category)

      if (filters.search) {
        params.append('search', filters.search)
      }

      if (filters.crafterId) {
        params.append('crafterId', filters.crafterId)
      }

      if (filters.minPrice) {
        params.append('minPrice', filters.minPrice)
      }

      if (filters.maxPrice) {
        params.append('maxPrice', filters.maxPrice)
      }

      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy)
      }

      // Fetch filtered products
      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error)
    } finally {
      setIsLoading(false)
    }
  }, [category]) // Depend on category to ensure proper filtering

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-primary-600 dark:hover:text-primary-400 transition">
          Categories
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {category}
        </span>
      </nav>

      {/* Category Header */}
      <div className="mb-8 bg-gradient-to-r from-primary-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-primary-100 dark:border-gray-600">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-6xl">{categoryInfo.emoji}</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {categoryInfo.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              {categoryInfo.description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary-600 dark:text-primary-400 text-2xl">
              {totalProducts}
            </span>
            <span>{totalProducts === 1 ? 'product' : 'products'} available</span>
          </div>
        </div>
      </div>

      {/* Filters Component - category filter is hidden since we're already in a category */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        crafters={crafters}
        totalProducts={totalProducts}
        filteredCount={products.length}
        hideCategory={true}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Loading products...
          </span>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {totalProducts === 0
                  ? `No ${category.toLowerCase()} products available yet. Check back soon!`
                  : 'Try adjusting your filters or search terms'}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
