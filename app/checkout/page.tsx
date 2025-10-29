'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Load Stripe outside of component to avoid recreating on re-render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get cart data from localStorage
    const cartData = localStorage.getItem('cart');
    const deliveryData = localStorage.getItem('deliveryInfo');
    const customerData = localStorage.getItem('customerInfo');

    if (!cartData || !deliveryData || !customerData) {
      setError('Missing checkout information. Please go back to your cart.');
      setLoading(false);
      return;
    }

    const cart = JSON.parse(cartData);
    const delivery = JSON.parse(deliveryData);
    const customer = JSON.parse(customerData);

    // Create payment intent
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        delivery,
        customerEmail: customer.email,
        customerName: customer.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        setClientSecret(data.clientSecret);
        setOrderId(data.orderId);
        setOrderNumber(data.orderNumber);
        setAmount(data.amount);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
        setLoading(false);
      });
  }, []);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#ea580c',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '8px',
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Checkout Error
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <a
                href="/cart"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
              >
                Return to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Order: <span className="font-semibold">{orderNumber}</span>
            </p>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              £{amount.toFixed(2)}
            </p>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance,
            }}
          >
            <CheckoutForm
              orderId={orderId}
              orderNumber={orderNumber}
              amount={amount}
            />
          </Elements>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>🔒 Secure Payment:</strong> Your payment information is
            encrypted and secure. We use Stripe for payment processing.
          </p>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>🧪 Test Mode:</strong> Use card number <code className="bg-amber-100 px-2 py-1 rounded">4242 4242 4242 4242</code> with any future date and CVC.
          </p>
        </div>
      </div>
    </div>
  );
}
