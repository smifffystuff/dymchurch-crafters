'use client'

import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  onSemanticSearch?: (query: string) => void
  crafters: Array<{ _id: string; name: string }>
  totalProducts: number
  filteredCount: number
}

export interface FilterState {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  crafterId: string
  sortBy: string
  useSemanticSearch: boolean
}

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Pottery', label: 'Pottery' },
  { value: 'Textiles', label: 'Textiles' },
  { value: 'Woodwork', label: 'Woodwork' },
  { value: 'Art', label: 'Art' },
  { value: 'Other', label: 'Other' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance', semanticOnly: true },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export default function ProductFilters({
  onFilterChange,
  onSemanticSearch,
  crafters,
  totalProducts,
  filteredCount,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    crafterId: '',
    sortBy: 'newest',
    useSemanticSearch: false,
  })

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isDebouncing, setIsDebouncing] = useState(false)
  const [pendingSearch, setPendingSearch] = useState('')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  // Debounced filter change - waits 500ms after user stops typing
  // BUT skips auto-trigger for semantic search (only triggers on Enter/button)
  useEffect(() => {
    // Skip on initial mount to prevent unnecessary API call
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // If semantic search is enabled and only the search field changed,
    // don't auto-trigger - wait for explicit user action
    if (filters.useSemanticSearch && filters.search !== pendingSearch) {
      setPendingSearch(filters.search)
      return
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Show debouncing indicator
    setIsDebouncing(true)

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      onFilterChange(filters)
      setIsDebouncing(false)
    }, 500)

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]) // Only depend on filters, not onFilterChange

  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    // Only update local state - debounce effect will call onFilterChange
    const newValue = key === 'useSemanticSearch' ? value === 'true' || value === true : value
    
    // When enabling Smart Search, automatically set sort to 'relevance'
    if (key === 'useSemanticSearch' && newValue === true) {
      setFilters({ ...filters, [key]: newValue, sortBy: 'relevance' })
    }
    // When disabling Smart Search, switch back to 'newest' if currently on 'relevance'
    else if (key === 'useSemanticSearch' && newValue === false && filters.sortBy === 'relevance') {
      setFilters({ ...filters, [key]: newValue, sortBy: 'newest' })
    }
    else {
      setFilters({ ...filters, [key]: newValue })
    }
  }

  const handleSearchSubmit = () => {
    // Immediately trigger search when user clicks search button or presses Enter
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    setIsDebouncing(false)
    setPendingSearch(filters.search)
    onFilterChange(filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      search: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      crafterId: '',
      sortBy: 'newest',
      useSemanticSearch: false,
    }
    
    // Clear debounce timer and apply immediately
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    setIsDebouncing(false)
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.crafterId

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters {hasActiveFilters && '(Active)'}
        </button>
      </div>

      {/* Filters Container */}
      <div
        className={`${
          showMobileFilters ? 'block' : 'hidden'
        } lg:block space-y-4`}
      >
        {/* Search Bar with Smart Search Toggle */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                filters.useSemanticSearch
                  ? "Try: 'handmade gift for mom' or 'cozy winter scarf'... (Press Enter to search)"
                  : "Search products, materials, descriptions..."
              }
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-24 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {filters.useSemanticSearch && filters.search && (
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
              >
                Search
              </button>
            )}
            {isDebouncing && filters.search && !filters.useSemanticSearch && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Smart Search Toggle */}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={filters.useSemanticSearch}
              onChange={(e) => updateFilter('useSemanticSearch', e.target.checked ? 'true' : 'false')}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="font-medium">Smart Search</span>
              <span className="text-gray-500 dark:text-gray-400">(AI-powered - Press Enter or click Search)</span>
            </span>
          </label>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Crafter Filter */}
          <select
            value={filters.crafterId}
            onChange={(e) => updateFilter('crafterId', e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Crafters</option>
            {crafters.map((crafter) => (
              <option key={crafter._id} value={crafter._id}>
                {crafter.name}
              </option>
            ))}
          </select>

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price (£)"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            min="0"
            step="0.01"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price (£)"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            min="0"
            step="0.01"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {SORT_OPTIONS.filter((option: any) => 
              // Show 'Relevance' only when Smart Search is enabled
              filters.useSemanticSearch || option.value !== 'relevance'
            ).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Summary & Clear Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredCount} of {totalProducts} products
            {hasActiveFilters && ' (filtered)'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
