'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardSetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    bio: '',
    specialty: '',
    phone: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create crafter profile
      const response = await fetch('/api/crafters/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to create crafter profile');
      }
    } catch (error) {
      console.error('Error creating crafter profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Set Up Your Crafter Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let&apos;s get your profile ready so you can start listing your products
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Sarah's Handmade Crafts"
          />
        </div>

        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Craft Specialty *
          </label>
          <input
            type="text"
            id="specialty"
            required
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Pottery, Jewelry, Woodwork"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio *
          </label>
          <textarea
            id="bio"
            required
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Tell customers about yourself and your craft..."
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="07XXX XXXXXX"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Dymchurch, Hythe"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
