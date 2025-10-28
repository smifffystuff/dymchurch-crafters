'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const { user, isLoaded } = useUser();
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    const fetchDebugData = async () => {
      try {
        const response = await fetch('/api/debug/user');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching debug data:', error);
      }
    };

    if (isLoaded) {
      fetchDebugData();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>;
  }

  const userRole = user?.unsafeMetadata?.role as string | undefined;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Information</h1>

      <div className="space-y-6">
        {/* Client-side User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Client-Side (useUser)</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>User ID:</strong> {user?.id || 'Not signed in'}
            </div>
            <div>
              <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress || 'N/A'}
            </div>
            <div>
              <strong>First Name:</strong> {user?.firstName || 'N/A'}
            </div>
            <div>
              <strong>Role (from unsafeMetadata):</strong>{' '}
              <span className={`px-2 py-1 rounded ${
                userRole === 'admin' ? 'bg-red-100 text-red-800' :
                userRole === 'crafter' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {userRole || 'No role set'}
              </span>
            </div>
            <div>
              <strong>Onboarding Complete:</strong>{' '}
              {(user?.unsafeMetadata as any)?.onboardingComplete ? 'Yes' : 'No'}
            </div>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">Full unsafeMetadata</summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded overflow-auto">
              {JSON.stringify(user?.unsafeMetadata, null, 2)}
            </pre>
          </details>
        </div>

        {/* Server-side API Data */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Server-Side (API Response)</h2>
          {apiData ? (
            <>
              <div className="space-y-2 font-mono text-sm mb-4">
                <div>
                  <strong>User ID:</strong> {apiData.userId || 'Not available'}
                </div>
                <div>
                  <strong>Role:</strong>{' '}
                  <span className={`px-2 py-1 rounded ${
                    apiData.role === 'admin' ? 'bg-red-100 text-red-800' :
                    apiData.role === 'crafter' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {apiData.role || 'No role set'}
                  </span>
                </div>
              </div>
              <details>
                <summary className="cursor-pointer font-semibold">Full API Response</summary>
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded overflow-auto">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </details>
            </>
          ) : (
            <div>Loading API data...</div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Test Navigation</h2>
          <div className="space-y-2">
            <div>
              <a href="/admin" className="text-blue-600 hover:underline">
                Try accessing /admin →
              </a>
              <span className="text-sm text-gray-500 ml-2">
                (Should work if role is &apos;admin&apos;)
              </span>
            </div>
            <div>
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Try accessing /dashboard →
              </a>
              <span className="text-sm text-gray-500 ml-2">
                (Should work if role is &apos;crafter&apos; or &apos;admin&apos;)
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Troubleshooting</h2>
          <div className="space-y-2 text-sm">
            <p><strong>If you don&apos;t see &apos;admin&apos; role above:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Go to Clerk Dashboard → Users</li>
              <li>Find your user and click on it</li>
              <li>Go to &quot;Metadata&quot; tab</li>
              <li>Add to &quot;Unsafe metadata&quot;:</li>
            </ol>
            <pre className="p-3 bg-gray-800 text-green-400 rounded mt-2">
{`{
  "role": "admin",
  "onboardingComplete": true
}`}
            </pre>
            <p className="mt-2"><strong>After saving, you MUST:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Sign out completely</li>
              <li>Sign in again</li>
              <li>Refresh this page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
