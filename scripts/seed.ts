/**
 * Database Seeding Script
 * 
 * This script populates the MongoDB database with initial sample data.
 * Run with: node --loader ts-node/esm scripts/seed.ts
 * Or: npm run seed
 */

// IMPORTANT: Load environment variables FIRST before any imports
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Now import other modules after env vars are loaded
import mongoose from 'mongoose'
import { Crafter } from '../lib/models/Crafter'
import { Product } from '../lib/models/Product'
import connectDB from '../lib/mongodb'

// Sample Crafters Data
const craftersData = [
  {
    name: 'Sarah Thompson',
    specialty: 'Textiles & Knitwear',
    location: 'Dymchurch',
    bio: 'I create cozy, hand-knitted items using sustainable yarns. Each piece is made with care and attention to detail. I\'ve been knitting for over 15 years and love creating pieces that bring warmth and comfort.',
    email: 'sarah@example.com',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
  {
    name: 'Michael Potter',
    specialty: 'Pottery & Ceramics',
    location: 'Hythe',
    bio: 'Traditional potter creating functional and decorative ceramics. All pieces are wheel-thrown and hand-glazed in my studio overlooking the sea. I use locally sourced clay whenever possible.',
    email: 'michael@example.com',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
  {
    name: 'David Woodsmith',
    specialty: 'Woodwork',
    location: 'New Romney',
    bio: 'Crafting beautiful wooden items from sustainably sourced local timber. Each piece celebrates the natural beauty of wood and is designed to last for generations.',
    email: 'david@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
  {
    name: 'Emma Jewels',
    specialty: 'Jewelry',
    location: 'St Mary\'s Bay',
    bio: 'Creating unique jewelry pieces in sterling silver and semi-precious stones. Every item is handmade to order in my small seaside studio. I draw inspiration from the coastal landscape.',
    email: 'emma@example.com',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
  {
    name: 'Alice Painter',
    specialty: 'Watercolor Art',
    location: 'Dymchurch',
    bio: 'Local artist specializing in watercolor landscapes of Romney Marsh and the Kent coast. I create original paintings and limited edition prints.',
    email: 'alice@example.com',
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
  {
    name: 'Tom Leather',
    specialty: 'Leather Goods',
    location: 'Hythe',
    bio: 'Handcrafting leather goods using traditional techniques. I make wallets, bags, belts, and custom items from premium leather that improves with age.',
    email: 'tom@example.com',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    verified: true,
    productsCount: 0,
  },
]

async function seed() {
  try {
    console.log('🌱 Starting database seeding...\n')

    // Connect to MongoDB
    await connectDB()

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Crafter.deleteMany({})
    await Product.deleteMany({})
    console.log('✅ Existing data cleared\n')

    // Insert Crafters
    console.log('👥 Inserting crafters...')
    const crafters = await Crafter.insertMany(craftersData)
    console.log(`✅ ${crafters.length} crafters inserted\n`)

    // Create Products with references to crafters
    console.log('📦 Inserting products...')
    
    const productsData = [
      {
        name: 'Hand-Knitted Scarf',
        price: 25.00,
        crafter: crafters[0].name,
        crafterId: crafters[0]._id,
        category: 'Textiles',
        description: 'Cozy hand-knitted scarf made from soft merino wool. Perfect for chilly winter days along the Kent coast. Each scarf is carefully hand-knitted to ensure quality and warmth.',
        materials: 'Merino wool',
        dimensions: '180cm x 25cm',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80'],
      },
      {
        name: 'Ceramic Coffee Mug',
        price: 18.50,
        crafter: crafters[1].name,
        crafterId: crafters[1]._id,
        category: 'Pottery',
        description: 'Beautiful handmade ceramic mug with unique glaze pattern. Microwave and dishwasher safe. Each mug is hand-thrown on a pottery wheel, making every piece unique.',
        materials: 'Ceramic, food-safe glaze',
        dimensions: '10cm height, 350ml capacity',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80'],
      },
      {
        name: 'Handmade Wooden Bowl',
        price: 45.00,
        crafter: crafters[2].name,
        crafterId: crafters[2]._id,
        category: 'Woodwork',
        description: 'Elegant wooden bowl hand-turned from local oak. Perfect for fruit or decorative display. The wood is sourced sustainably from local Kent woodlands.',
        materials: 'Oak wood, natural oil finish',
        dimensions: '25cm diameter, 8cm depth',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80'],
      },
      {
        name: 'Sterling Silver Necklace',
        price: 65.00,
        crafter: crafters[3].name,
        crafterId: crafters[3]._id,
        category: 'Jewelry',
        description: 'Delicate sterling silver necklace with handcrafted pendant. Comes in a gift box. Perfect for everyday wear or special occasions.',
        materials: 'Sterling silver',
        dimensions: '45cm chain length',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
      },
      {
        name: 'Watercolor Landscape Print',
        price: 35.00,
        crafter: crafters[4].name,
        crafterId: crafters[4]._id,
        category: 'Art',
        description: 'Beautiful watercolor print of Romney Marsh landscape. A4 size, ready to frame. Captures the unique beauty of the local marshlands.',
        materials: 'Archival paper, watercolor',
        dimensions: 'A4 (21cm x 29.7cm)',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'],
      },
      {
        name: 'Leather Wallet',
        price: 55.00,
        crafter: crafters[5].name,
        crafterId: crafters[5]._id,
        category: 'Other',
        description: 'Handcrafted leather wallet with multiple card slots. Made from premium full-grain leather that ages beautifully over time.',
        materials: 'Full-grain leather',
        dimensions: '11cm x 9cm',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
      },
      // Additional products
      {
        name: 'Knitted Baby Blanket',
        price: 45.00,
        crafter: crafters[0].name,
        crafterId: crafters[0]._id,
        category: 'Textiles',
        description: 'Soft and cozy baby blanket, hand-knitted with love. Made from hypoallergenic yarn, perfect for sensitive skin.',
        materials: 'Cotton blend yarn',
        dimensions: '80cm x 80cm',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80'],
      },
      {
        name: 'Ceramic Serving Platter',
        price: 42.00,
        crafter: crafters[1].name,
        crafterId: crafters[1]._id,
        category: 'Pottery',
        description: 'Large handmade ceramic platter with beautiful coastal-inspired glaze. Perfect for serving or as a centerpiece.',
        materials: 'Stoneware ceramic',
        dimensions: '35cm diameter',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80'],
      },
      {
        name: 'Wooden Cutting Board',
        price: 35.00,
        crafter: crafters[2].name,
        crafterId: crafters[2]._id,
        category: 'Woodwork',
        description: 'Durable cutting board made from maple wood. Features a juice groove and easy-grip handles.',
        materials: 'Maple wood, mineral oil finish',
        dimensions: '40cm x 25cm',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80'],
      },
      {
        name: 'Handmade Silver Earrings',
        price: 28.00,
        crafter: crafters[3].name,
        crafterId: crafters[3]._id,
        category: 'Jewelry',
        description: 'Elegant drop earrings crafted from sterling silver. Lightweight and perfect for everyday wear.',
        materials: 'Sterling silver',
        dimensions: '3cm length',
        inStock: true,
        featured: false,
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
      },
      {
        name: 'Coastal Scene Watercolor',
        price: 85.00,
        crafter: crafters[4].name,
        crafterId: crafters[4]._id,
        category: 'Art',
        description: 'Original watercolor painting of Dymchurch beach at sunset. Unframed, painted on high-quality watercolor paper.',
        materials: 'Watercolor on 300gsm paper',
        dimensions: 'A3 (30cm x 42cm)',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80'],
      },
      {
        name: 'Leather Messenger Bag',
        price: 125.00,
        crafter: crafters[5].name,
        crafterId: crafters[5]._id,
        category: 'Other',
        description: 'Classic leather messenger bag with adjustable strap. Features multiple compartments and brass hardware.',
        materials: 'Full-grain leather, brass fittings',
        dimensions: '38cm x 28cm x 10cm',
        inStock: true,
        featured: true,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'],
      },
    ]

    const products = await Product.insertMany(productsData)
    console.log(`✅ ${products.length} products inserted\n`)

    // Update crafter product counts
    console.log('🔄 Updating crafter product counts...')
    for (const crafter of crafters) {
      const count = products.filter(
        (p) => p.crafterId?.toString() === crafter._id?.toString()
      ).length
      await Crafter.findByIdAndUpdate(crafter._id, { productsCount: count })
    }
    console.log('✅ Product counts updated\n')

    // Display summary
    console.log('📊 Seeding Summary:')
    console.log('===================')
    console.log(`Crafters: ${crafters.length}`)
    console.log(`Products: ${products.length}`)
    console.log(`Featured Products: ${products.filter(p => p.featured).length}`)
    console.log('\n✅ Database seeding completed successfully! 🎉\n')

    // Close connection
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seed()
