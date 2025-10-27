import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        <span className="text-gray-400 text-sm">Product Image</span>
        {product.featured && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary-600">£{product.price.toFixed(2)}</p>
          {product.inStock ? (
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-sm text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">by {product.crafter}</p>
      </div>
    </Link>
  )
}
