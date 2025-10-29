'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      crafter: product.crafter || 'Unknown Crafter',
      crafterId: typeof product.crafterId === 'string' ? product.crafterId : product.crafterId?._id || '',
      image: product.images && product.images.length > 0 ? product.images[0] : undefined,
      category: product.category,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <Link href={`/products/${product._id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className="text-gray-400 text-sm">Product Image</span>
          )}
          {product.featured && (
            <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
              Featured
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product._id}`}>
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        </Link>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-bold text-primary-600">£{product.price.toFixed(2)}</p>
            {product.inStock ? (
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-3">by {product.crafter}</p>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
