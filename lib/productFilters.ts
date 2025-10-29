// Shared utility functions for product filtering and searching

export interface FilterState {
  search: string;
  category?: string;
  crafterId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  useSemanticSearch?: boolean;
}

/**
 * Applies client-side filters to a product list
 */
export function applyProductFilters(
  products: any[],
  filters: FilterState,
  options?: {
    categoryFilter?: string; // Force filter by specific category
  }
): any[] {
  let results = [...products];

  // Filter by category (either from filters or forced category)
  if (options?.categoryFilter) {
    results = results.filter((p: any) => p.category === options.categoryFilter);
  } else if (filters.category && filters.category !== 'all') {
    results = results.filter((p: any) => p.category === filters.category);
  }

  // Filter by crafter
  if (filters.crafterId) {
    results = results.filter((p: any) => p.crafterId._id === filters.crafterId);
  }

  // Filter by price range
  if (filters.minPrice) {
    results = results.filter((p: any) => p.price >= Number.parseFloat(filters.minPrice as string));
  }
  if (filters.maxPrice) {
    results = results.filter((p: any) => p.price <= Number.parseFloat(filters.maxPrice as string));
  }

  return results;
}

/**
 * Sorts products based on the sortBy filter
 */
export function sortProducts(products: any[], sortBy?: string): any[] {
  // 'relevance' and 'newest' preserve original order (for semantic search or database order)
  if (!sortBy || sortBy === 'newest' || sortBy === 'relevance') {
    return products;
  }

  const sorted = [...products];

  sorted.sort((a: any, b: any) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return sorted;
}

/**
 * Performs semantic search and applies filters
 */
export async function performSemanticSearch(
  searchQuery: string,
  filters: FilterState,
  options?: {
    categoryFilter?: string;
  }
): Promise<{ success: boolean; products: any[] }> {
  try {
    const response = await fetch('/api/search/semantic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 50,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Apply client-side filters to semantic search results
      let results = applyProductFilters(data.data, filters, options);
      
      // Apply sorting
      results = sortProducts(results, filters.sortBy);

      return { success: true, products: results };
    }

    return { success: false, products: [] };
  } catch (error) {
    console.error('Semantic search error:', error);
    return { success: false, products: [] };
  }
}
