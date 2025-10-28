'use client'

import { useState, useCallback } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductFilters, { FilterState } from '@/components/ProductFilters'
import { Loader2 } from 'lucide-react'

interface ProductsClientProps {
  initialProducts: any[]
  crafters: Array<{ _id: string; name: string }>
}

export default function ProductsClient({
  initialProducts,
  crafters,
}: ProductsClientProps) {
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

          // Filter by category
          if (filters.category && filters.category !== 'all') {
            results = results.filter((p: any) => p.category === filters.category)
          }

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

      // Otherwise use traditional search
      const params = new URLSearchParams()

      if (filters.search) {
        params.append('search', filters.search)
      }

      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category)
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
  }, []) // Empty dependency array since we don't depend on any props or state

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          All Products
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover unique handmade items from local artisans
        </p>
      </div>

      {/* Filters Component */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        crafters={crafters}
        totalProducts={totalProducts}
        filteredCount={products.length}
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
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
