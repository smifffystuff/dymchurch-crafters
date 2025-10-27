// @ts-nocheck
// This file is deprecated - using MongoDB database instead
import { Product, Crafter } from '@/types'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Hand-Knitted Scarf',
    price: 25.00,
    crafter: 'Sarah Thompson',
    crafterId: 1,
    category: 'Textiles',
    description: 'Cozy hand-knitted scarf made from soft merino wool. Perfect for chilly winter days along the Kent coast. Each scarf is carefully hand-knitted to ensure quality and warmth.',
    materials: 'Merino wool',
    dimensions: '180cm x 25cm',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Ceramic Coffee Mug',
    price: 18.50,
    crafter: 'Michael Potter',
    crafterId: 2,
    category: 'Pottery',
    description: 'Beautiful handmade ceramic mug with unique glaze pattern. Microwave and dishwasher safe. Each mug is hand-thrown on a pottery wheel, making every piece unique.',
    materials: 'Ceramic, food-safe glaze',
    dimensions: '10cm height, 350ml capacity',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Handmade Wooden Bowl',
    price: 45.00,
    crafter: 'David Woodsmith',
    crafterId: 3,
    category: 'Woodwork',
    description: 'Elegant wooden bowl hand-turned from local oak. Perfect for fruit or decorative display. The wood is sourced sustainably from local Kent woodlands.',
    materials: 'Oak wood, natural oil finish',
    dimensions: '25cm diameter, 8cm depth',
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'Sterling Silver Necklace',
    price: 65.00,
    crafter: 'Emma Jewels',
    crafterId: 4,
    category: 'Jewelry',
    description: 'Delicate sterling silver necklace with handcrafted pendant. Comes in a gift box. Perfect for everyday wear or special occasions.',
    materials: 'Sterling silver',
    dimensions: '45cm chain length',
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Watercolor Landscape Print',
    price: 35.00,
    crafter: 'Alice Painter',
    crafterId: 5,
    category: 'Art',
    description: 'Beautiful watercolor print of Romney Marsh landscape. A4 size, ready to frame. Captures the unique beauty of the local marshlands.',
    materials: 'Archival paper, watercolor',
    dimensions: 'A4 (21cm x 29.7cm)',
    inStock: true
  },
  {
    id: 6,
    name: 'Leather Wallet',
    price: 55.00,
    crafter: 'Tom Leather',
    crafterId: 6,
    category: 'Other',
    description: 'Handcrafted leather wallet with multiple card slots. Made from premium full-grain leather that ages beautifully over time.',
    materials: 'Full-grain leather',
    dimensions: '11cm x 9cm',
    inStock: true
  }
]

export const mockCrafters: Crafter[] = [
  {
    id: 1,
    name: 'Sarah Thompson',
    specialty: 'Textiles & Knitwear',
    location: 'Dymchurch',
    bio: 'I create cozy, hand-knitted items using sustainable yarns. Each piece is made with care and attention to detail. I\'ve been knitting for over 15 years and love creating pieces that bring warmth and comfort.',
    productsCount: 12
  },
  {
    id: 2,
    name: 'Michael Potter',
    specialty: 'Pottery & Ceramics',
    location: 'Hythe',
    bio: 'Traditional potter creating functional and decorative ceramics. All pieces are wheel-thrown and hand-glazed in my studio overlooking the sea. I use locally sourced clay whenever possible.',
    productsCount: 18
  },
  {
    id: 3,
    name: 'David Woodsmith',
    specialty: 'Woodwork',
    location: 'New Romney',
    bio: 'Crafting beautiful wooden items from sustainably sourced local timber. Each piece celebrates the natural beauty of wood and is designed to last for generations.',
    productsCount: 8
  },
  {
    id: 4,
    name: 'Emma Jewels',
    specialty: 'Jewelry',
    location: 'St Mary\'s Bay',
    bio: 'Creating unique jewelry pieces in sterling silver and semi-precious stones. Every item is handmade to order in my small seaside studio. I draw inspiration from the coastal landscape.',
    productsCount: 25
  },
  {
    id: 5,
    name: 'Alice Painter',
    specialty: 'Watercolor Art',
    location: 'Dymchurch',
    bio: 'Local artist specializing in watercolor landscapes of Romney Marsh and the Kent coast. I create original paintings and limited edition prints.',
    productsCount: 15
  },
  {
    id: 6,
    name: 'Tom Leather',
    specialty: 'Leather Goods',
    location: 'Hythe',
    bio: 'Handcrafting leather goods using traditional techniques. I make wallets, bags, belts, and custom items from premium leather that improves with age.',
    productsCount: 10
  }
]
