export interface Product {
  id: number
  name: string
  price: number
  crafter: string
  crafterId: number
  category: string
  description: string
  materials: string
  dimensions?: string
  inStock: boolean
  featured?: boolean
}

export interface Crafter {
  id: number
  name: string
  specialty: string
  location: string
  bio: string
  productsCount: number
}

export interface Category {
  name: string
  slug: string
  description: string
  productCount: number
  icon: string
}

export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  crafter: string
  deliveryOption: 'pickup' | 'delivery' | 'shipping'
}
