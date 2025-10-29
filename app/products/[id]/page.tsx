'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import { fetchProduct } from '@/lib/api'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [deliveryOption, setDeliveryOption] = useState('pickup')
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      const response = await fetchProduct(id)
      
      if (response.success && response.data) {
        setProduct(response.data)
        setError(false)
      } else {
        setError(true)
      }
      
      setLoading(false)
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    )
  }
  
  if (error || !product) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const crafterInfo = typeof product.crafterId === 'object' ? product.crafterId : null
    
    // Add item(s) to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        crafter: crafterInfo ? crafterInfo.name : 'Unknown Crafter',
        crafterId: crafterInfo ? crafterInfo._id : '',
        image: product.images && product.images.length > 0 ? product.images[0] : undefined,
        category: product.category,
      })
    }

    // Show success message
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  const crafterInfo = typeof product.crafterId === 'object' ? product.crafterId : null

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          {' > '}
          <Link href="/products" className="hover:text-primary-600 dark:hover:text-primary-400">Products</Link>
          {' > '}
          <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <span className="text-gray-400 text-xl">Product Image</span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-75">
                  <span className="text-gray-400 text-xs">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary-600 mb-6">£{product.price.toFixed(2)}</p>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Materials:</span> {product.materials}</li>
                {product.dimensions && <li><span className="font-medium">Dimensions:</span> {product.dimensions}</li>}
                <li>
                  <span className="font-medium">Made by:</span>{' '}
                  {crafterInfo ? (
                    <Link href={`/crafters/${crafterInfo._id}`} className="text-primary-600 hover:underline">
                      {crafterInfo.name}
                    </Link>
                  ) : (
                    <span>{product.crafter}</span>
                  )}
                </li>
                <li><span className="font-medium">Availability:</span> <span className={product.inStock ? "text-green-600" : "text-red-600"}>{product.inStock ? "In Stock" : "Out of Stock"}</span></li>
              </ul>
            </div>

            {/* Delivery Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Delivery Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === 'pickup'}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="mr-2"
                  />
                  <span>Local Pickup (Free) - Dymchurch</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryOption === 'delivery'}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="mr-2"
                  />
                  <span>Local Delivery (£3.50) - Within 10 miles</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="shipping"
                    checked={deliveryOption === 'shipping'}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="mr-2"
                  />
                  <span>UK Shipping (£5.00)</span>
                </label>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed relative"
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {addedToCart && (
              <div className="mb-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                <span className="text-green-800">
                  ✓ {quantity} item{quantity > 1 ? 's' : ''} added to cart
                </span>
                <button
                  onClick={() => router.push('/cart')}
                  className="text-green-600 hover:text-green-700 font-semibold underline"
                >
                  View Cart
                </button>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition">
              Contact Crafter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
