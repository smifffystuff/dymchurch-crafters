'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PendingCrafter {
  _id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  contactEmail: string;
  verified: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [pendingCrafters, setPendingCrafters] = useState<PendingCrafter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = user?.unsafeMetadata?.role as string | undefined;
    
    if (isLoaded && userRole !== 'admin') {
      router.push('/');
      return;
    }

    const fetchPendingCrafters = async () => {
      try {
        const response = await fetch('/api/admin/crafters/pending');
        if (response.ok) {
          const data = await response.json();
          setPendingCrafters(data.crafters);
        }
      } catch (error) {
        console.error('Error fetching pending crafters:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && userRole === 'admin') {
      fetchPendingCrafters();
    }
  }, [isLoaded, user, router]);

  const handleApprove = async (crafterId: string) => {
    try {
      const response = await fetch(`/api/admin/crafters/${crafterId}/approve`, {
        method: 'POST',
      });

      if (response.ok) {
        setPendingCrafters(prev => prev.filter(c => c._id !== crafterId));
      }
    } catch (error) {
      console.error('Error approving crafter:', error);
    }
  };

  const handleReject = async (crafterId: string) => {
    try {
      const response = await fetch(`/api/admin/crafters/${crafterId}/reject`, {
        method: 'POST',
      });

      if (response.ok) {
        setPendingCrafters(prev => prev.filter(c => c._id !== crafterId));
      }
    } catch (error) {
      console.error('Error rejecting crafter:', error);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage crafter applications and platform settings
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Pending Crafter Applications ({pendingCrafters.length})
        </h2>

        {pendingCrafters.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No pending applications at this time.
          </p>
        ) : (
          <div className="space-y-4">
            {pendingCrafters.map((crafter) => (
              <div
                key={crafter._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {crafter.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {crafter.specialty} • {crafter.location}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {crafter.bio}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>📧 {crafter.contactEmail}</span>
                      <span>📅 Applied: {new Date(crafter.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleApprove(crafter._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(crafter._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
