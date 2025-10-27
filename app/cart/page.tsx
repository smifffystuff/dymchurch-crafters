'use client'

import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: 'Hand-Knitted Scarf',
    price: 25.00,
    quantity: 1,
    crafter: 'Sarah Thompson',
    deliveryOption: 'pickup' as const
  },
  {
    id: 2,
    productId: 2,
    name: 'Ceramic Coffee Mug',
    price: 18.50,
    quantity: 2,
    crafter: 'Michael Potter',
    deliveryOption: 'delivery' as const
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = cartItems.some(item => item.deliveryOption === 'delivery') ? 3.50 : 0
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    alert('Proceeding to checkout...\n\nThis is a simulated payment. In production, this would integrate with Stripe for secure payment processing.')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartItemCount={cartItems.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link 
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        <Link href={`/products/${item.productId}`} className="hover:text-primary-600">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">by {item.crafter}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        Delivery: {item.deliveryOption === 'pickup' ? 'Local Pickup' : 'Local Delivery'}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">£{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition mb-3"
                >
                  Proceed to Checkout
                </button>
                <Link
                  href="/products"
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Continue Shopping
                </Link>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">💳 Simulated Payment</p>
                  <p className="text-xs text-gray-500">
                    Payment processing is simulated. Stripe integration will be added later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
