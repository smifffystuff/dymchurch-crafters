import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models/Product'
import { Crafter } from '@/lib/models/Crafter'
import { Category } from '@/lib/models/Category'
import CategoryClient from './CategoryClient'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const slug = decodeURIComponent(categorySlug).toLowerCase()
  
  await connectDB()
  
  // Find category by slug
  const categoryDoc = await Category.findOne({ slug, isActive: true }).lean()

  if (!categoryDoc) {
    return {
      title: 'Category Not Found',
    }
  }

  const category = categoryDoc as any

  return {
    title: `${category.name} | Dymchurch Crafters`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Dymchurch Crafters`,
      description: category.description,
      type: 'website',
    },
  }
}

// Generate static params for all active categories
export async function generateStaticParams() {
  await connectDB()
  
  const categories = await Category.find({ isActive: true }).select('slug').lean()
  
  return categories.map((category: any) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const slug = decodeURIComponent(categorySlug).toLowerCase()
  
  await connectDB()

  // Find category by slug
  const categoryDoc = await Category.findOne({ slug, isActive: true }).lean()

  // If category doesn't exist, show 404
  if (!categoryDoc) {
    notFound()
  }

  // Type-safe category object
  const category = categoryDoc as any

  // Fetch all products in this category
  const products = await Product.find({ category: category.name })
    .populate('crafterId', 'name specialty location')
    .select('-embedding')
    .sort({ createdAt: -1 })
    .lean()

  // Fetch all crafters for the filter dropdown
  const crafters = await Crafter.find()
    .select('_id name')
    .sort({ name: 1 })
    .lean()

  // Prepare category info
  const categoryInfo = {
    title: category.name,
    description: category.description,
    emoji: category.icon,
  }

  // Serialize data
  const serializedProducts = products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
    crafterId: {
      _id: product.crafterId._id.toString(),
      name: product.crafterId.name,
      specialty: product.crafterId.specialty,
      location: product.crafterId.location,
    },
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  }))

  const serializedCrafters = crafters.map((crafter: any) => ({
    _id: crafter._id.toString(),
    name: crafter.name,
  }))

  return (
    <CategoryClient
      category={category.name}
      categoryInfo={categoryInfo}
      initialProducts={serializedProducts}
      crafters={serializedCrafters}
    />
  )
}
