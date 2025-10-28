import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCrafter } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Mail, MapPin, Package } from 'lucide-react'

interface CrafterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CrafterPage({ params }: CrafterPageProps) {
  const { id } = await params
  
  // Fetch crafter data from API
  const response = await fetchCrafter(id)
  
  if (!response.success || !response.data) {
    notFound()
  }

  const crafter = response.data
  const products = crafter.products || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Crafter Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center overflow-hidden relative">
              {crafter.profileImage ? (
                <Image
                  src={crafter.profileImage}
                  alt={crafter.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                  priority
                />
              ) : (
                <span className="text-6xl md:text-8xl">👤</span>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="mb-4">
              {crafter.verified && (
                <span className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full mb-3">
                  ✓ Verified Crafter
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {crafter.name}
              </h1>
              <p className="text-2xl text-primary-600 dark:text-primary-400 font-medium mb-3">
                {crafter.specialty}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{crafter.location}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Package className="w-5 h-5 mr-2" />
                <span>{products.length} {products.length === 1 ? 'Product' : 'Products'}</span>
              </div>
              {crafter.email && (
                <a
                  href={`mailto:${crafter.email}`}
                  className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  <span>Contact</span>
                </a>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {crafter.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Products by {crafter.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Browse all handmade items from this talented artisan
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This crafter hasn't listed any products yet. Check back soon!
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Back to Crafters Link */}
      <div className="mt-12 text-center">
        <Link
          href="/crafters"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          ← Back to All Crafters
        </Link>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CrafterPageProps) {
  const { id } = await params
  const response = await fetchCrafter(id)
  
  if (!response.success || !response.data) {
    return {
      title: 'Crafter Not Found',
    }
  }

  const crafter = response.data

  return {
    title: `${crafter.name} - ${crafter.specialty} | Dymchurch Crafters`,
    description: crafter.bio,
    openGraph: {
      title: `${crafter.name} - ${crafter.specialty}`,
      description: crafter.bio,
      type: 'profile',
    },
  }
}
