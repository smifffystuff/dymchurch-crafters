export interface Product {
  _id: string
  name: string
  price: number
  crafter: string
  crafterId: string | { _id: string; name: string; specialty: string; location: string }
  category: string
  description: string
  materials: string
  dimensions?: string
  inStock: boolean
  featured?: boolean
  images?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Crafter {
  _id: string
  name: string
  specialty: string
  location: string
  bio: string
  email?: string
  phone?: string
  profileImage?: string
  verified?: boolean
  productsCount: number
  createdAt?: Date
  updatedAt?: Date
  products?: Product[]
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
