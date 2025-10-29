import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12"><div className="max-w-2xl mx-auto px-4 text-center">Loading...</div></div>}>
      <OrderConfirmationClient />
    </Suspense>
  );
}
