import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Category } from '../lib/models/Category'

// Load environment variables
dotenv.config({ path: '.env.local' })

const INITIAL_CATEGORIES = [
  {
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Handcrafted necklaces, bracelets, earrings, and rings',
    icon: '💍',
    displayOrder: 1,
    isActive: true,
  },
  {
    name: 'Pottery',
    slug: 'pottery',
    description: 'Ceramic mugs, bowls, plates, and decorative items',
    icon: '🏺',
    displayOrder: 2,
    isActive: true,
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    description: 'Knitted scarves, blankets, bags, and clothing',
    icon: '🧶',
    displayOrder: 3,
    isActive: true,
  },
  {
    name: 'Woodwork',
    slug: 'woodwork',
    description: 'Wooden bowls, furniture, toys, and decorative pieces',
    icon: '🪵',
    displayOrder: 4,
    isActive: true,
  },
  {
    name: 'Art',
    slug: 'art',
    description: 'Paintings, prints, illustrations, and mixed media',
    icon: '🎨',
    displayOrder: 5,
    isActive: true,
  },
  {
    name: 'Other',
    slug: 'other',
    description: 'Leather goods, candles, soaps, and more unique items',
    icon: '✨',
    displayOrder: 6,
    isActive: true,
  },
  {
    name: 'Leather Goods',
    slug: 'leather-goods',
    description: 'Leather goods, bags, wallets, etc.',
    icon: '✨',
    displayOrder: 6,
    isActive: true,
  },
]

async function seedCategories() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Clear existing categories (optional - comment out if you want to preserve existing)
    console.log('Clearing existing categories...')
    await Category.deleteMany({})
    console.log('Existing categories cleared')

    // Insert initial categories
    console.log('Inserting initial categories...')
    const result = await Category.insertMany(INITIAL_CATEGORIES)
    console.log(`✅ Successfully inserted ${result.length} categories`)

    // Display the created categories
    console.log('\nCreated categories:')
    result.forEach((category) => {
      console.log(`  ${category.icon} ${category.name} (${category.slug})`)
    })

    console.log('\n✅ Category seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
    process.exit(0)
  }
}

// Run the seed function
seedCategories()
