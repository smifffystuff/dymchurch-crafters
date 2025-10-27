// API utility functions for fetching data

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  error?: string
}

// Fetch all products
export async function fetchProducts(params?: {
  category?: string
  featured?: boolean
}): Promise<ApiResponse<any[]>> {
  try {
    const searchParams = new URLSearchParams()
    
    if (params?.category) {
      searchParams.append('category', params.category)
    }
    
    if (params?.featured) {
      searchParams.append('featured', 'true')
    }

    const url = `${API_BASE_URL}/api/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      cache: 'no-store', // Always get fresh data
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      success: false,
      error: 'Failed to fetch products',
    }
  }
}

// Fetch a single product by ID
export async function fetchProduct(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      success: false,
      error: 'Failed to fetch product',
    }
  }
}

// Fetch all crafters
export async function fetchCrafters(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/crafters`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch crafters')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching crafters:', error)
    return {
      success: false,
      error: 'Failed to fetch crafters',
    }
  }
}

// Fetch a single crafter by ID
export async function fetchCrafter(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/crafters/${id}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch crafter')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching crafter:', error)
    return {
      success: false,
      error: 'Failed to fetch crafter',
    }
  }
}
