'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'crafter' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelection = async (role: 'customer' | 'crafter') => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Update user metadata with role
      await user.update({
        unsafeMetadata: {
          role: role,
          onboardingComplete: true,
        },
      });

      // Force reload to refresh session
      await user.reload();

      // Small delay to ensure session is updated
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect based on role
      if (role === 'crafter') {
        router.push('/dashboard/setup');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Dymchurch Crafters!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            How would you like to use our marketplace?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Option */}
          <div
            onClick={() => setSelectedRole('customer')}
            className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'customer'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                I want to Shop
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Browse and purchase unique handmade items from local crafters
              </p>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ Discover local artisans</li>
                <li>✓ Purchase unique handmade items</li>
                <li>✓ Support local community</li>
                <li>✓ Save favorites and track orders</li>
              </ul>
            </div>
          </div>

          {/* Crafter Option */}
          <div
            onClick={() => setSelectedRole('crafter')}
            className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'crafter'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
            }`}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                I want to Sell
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Showcase and sell your handmade crafts to the local community
              </p>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ Create your crafter profile</li>
                <li>✓ List your handmade products</li>
                <li>✓ Manage your inventory</li>
                <li>✓ Connect with local customers</li>
              </ul>
            </div>
          </div>
        </div>

        {selectedRole && (
          <div className="mt-8 text-center">
            <button
              onClick={() => handleRoleSelection(selectedRole)}
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Setting up your account...' : 'Continue'}
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          You can change this later in your account settings
        </div>
      </div>
    </div>
  );
}
