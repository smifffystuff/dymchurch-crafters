'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [crafterProfile, setCrafterProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrafterProfile = async () => {
      try {
        const response = await fetch('/api/crafters/me');
        if (response.ok) {
          const data = await response.json();
          setCrafterProfile(data.crafter);
        }
      } catch (error) {
        console.error('Error fetching crafter profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchCrafterProfile();
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!crafterProfile) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Crafter Profile Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to set up your crafter profile first.
          </p>
          <Link
            href="/dashboard/setup"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Set Up Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crafter Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {crafterProfile.name}!
        </p>
      </div>

      {!crafterProfile.verified && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Profile Pending Verification
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  Your crafter profile is awaiting admin approval. You&apos;ll be able to list products once verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {crafterProfile.productsCount || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Status
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {crafterProfile.verified ? (
              <span className="text-green-600">Verified</span>
            ) : (
              <span className="text-yellow-600">Pending</span>
            )}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Specialty
          </h3>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {crafterProfile.specialty}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/products/new"
              className="block px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
            >
              ➕ Add New Product
            </Link>
            <Link
              href="/dashboard/products"
              className="block px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              📦 Manage Products
            </Link>
            <Link
              href="/dashboard/profile"
              className="block px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              👤 Edit Profile
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Information
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Name</dt>
              <dd className="text-gray-900 dark:text-white">{crafterProfile.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
              <dd className="text-gray-900 dark:text-white">{crafterProfile.location}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="text-gray-900 dark:text-white">{crafterProfile.contactEmail || 'Not set'}</dd>
            </div>
            {crafterProfile.contactPhone && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                <dd className="text-gray-900 dark:text-white">{crafterProfile.contactPhone}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
