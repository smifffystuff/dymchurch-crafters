'use client'

import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mockProducts } from '@/data/mockData'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [deliveryOption, setDeliveryOption] = useState('pickup')
  
  const product = mockProducts.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!\nDelivery: ${deliveryOption}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          {' > '}
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          {' > '}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-xl">Product Image</span>
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
                <li><span className="font-medium">Made by:</span> <Link href={`/crafters/${product.crafterId}`} className="text-primary-600 hover:underline">{product.crafter}</Link></li>
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
                className="flex-1 bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Add to Cart
              </button>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition">
              Contact Crafter
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
