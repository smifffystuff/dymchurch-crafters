'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { items: cartItems, updateQuantity, removeItem } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'local-delivery' | 'shipping'>('pickup')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  const updateItemQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const removeCartItem = (productId: string) => {
    removeItem(productId)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  const getDeliveryFee = () => {
    switch (deliveryMethod) {
      case 'pickup':
        return 0
      case 'local-delivery':
        return 3.50
      case 'shipping':
        return 5.95
      default:
        return 0
    }
  }
  
  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    setShowCheckoutForm(true)
  }

  const handleProceedToPayment = () => {
    // Validate form
    if (!customerName || !customerEmail) {
      alert('Please enter your name and email')
      return
    }

    if (!customerEmail.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    // Prepare cart data for checkout
    const cartData = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      crafterName: item.crafter,
    }))

    const deliveryInfo = {
      method: deliveryMethod,
      fee: deliveryFee,
    }

    const customerInfo = {
      name: customerName,
      email: customerEmail,
    }

    // Store in localStorage for checkout page to access
    localStorage.setItem('cart', JSON.stringify(cartData))
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo))
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo))

    // Navigate to checkout
    router.push('/checkout')
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Shopping Cart</h1>

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
                <div key={item.productId} className="bg-white rounded-lg shadow-md p-6">
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
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeCartItem(item.productId)}
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

              {/* Checkout Form */}
              {showCheckoutForm && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We&apos;ll send your order confirmation here
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Method *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="delivery"
                            value="pickup"
                            checked={deliveryMethod === 'pickup'}
                            onChange={(e) => setDeliveryMethod(e.target.value as any)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <span className="font-medium">Local Pickup</span>
                            <p className="text-sm text-gray-600">Free - Collect from crafter</p>
                          </div>
                          <span className="font-semibold">Free</span>
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="delivery"
                            value="local-delivery"
                            checked={deliveryMethod === 'local-delivery'}
                            onChange={(e) => setDeliveryMethod(e.target.value as any)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <span className="font-medium">Local Delivery</span>
                            <p className="text-sm text-gray-600">Within Dymchurch area</p>
                          </div>
                          <span className="font-semibold">£3.50</span>
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="delivery"
                            value="shipping"
                            checked={deliveryMethod === 'shipping'}
                            onChange={(e) => setDeliveryMethod(e.target.value as any)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <span className="font-medium">UK Shipping</span>
                            <p className="text-sm text-gray-600">Royal Mail</p>
                          </div>
                          <span className="font-semibold">£5.95</span>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              )}
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
                
                {!showCheckoutForm ? (
                  <>
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
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      👈 Fill in your details to continue
                    </p>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">� Secure Checkout</p>
                  <p className="text-xs text-gray-500">
                    Powered by Stripe. Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
