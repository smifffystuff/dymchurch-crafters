# MongoDB Setup Guide

## Step 1: Add Your MongoDB Connection String

Open the `.env.local` file and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/crafter-showcase?retryWrites=true&w=majority
```

Replace the following in your connection string:
- `YOUR_USERNAME` - Your MongoDB Atlas username
- `YOUR_PASSWORD` - Your MongoDB Atlas password  
- `YOUR_CLUSTER` - Your cluster name (e.g., cluster0.abc123.mongodb.net)

**Important**: Make sure your connection string includes:
- Database name: `crafter-showcase` (or your preferred name)
- `retryWrites=true&w=majority` parameters

## Step 2: Whitelist Your IP Address

In MongoDB Atlas:
1. Go to "Network Access"
2. Click "Add IP Address"
3. Either:
   - Add your current IP
   - Or add `0.0.0.0/0` for development (allows all IPs)

## Step 3: Run the Seed Script

Once your `.env.local` file has the MongoDB URI, run:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Create collections (Crafters, Products, Orders)
- Insert 6 crafters
- Insert 12 sample products
- Update product counts for each crafter

## Step 4: Verify Data

You can verify the data was inserted by:

1. **Using MongoDB Atlas UI**:
   - Go to your cluster
   - Click "Browse Collections"
   - View the `crafters` and `products` collections

2. **Using the app**:
   - Start the dev server: `npm run dev`
   - The app will now fetch data from MongoDB!

## Database Schema

### Crafters Collection
```typescript
{
  _id: ObjectId
  name: string
  specialty: string
  location: string
  bio: string
  email?: string
  verified: boolean
  productsCount: number
  createdAt: Date
  updatedAt: Date
}
```

### Products Collection
```typescript
{
  _id: ObjectId
  name: string
  price: number
  crafter: string
  crafterId: ObjectId (ref: Crafter)
  category: 'Jewelry' | 'Pottery' | 'Textiles' | 'Woodwork' | 'Art' | 'Other'
  description: string
  materials: string
  dimensions?: string
  inStock: boolean
  featured: boolean
  images: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Orders Collection
```typescript
{
  _id: ObjectId
  orderNumber: string
  customerEmail: string
  customerName: string
  items: [{
    productId: ObjectId
    productName: string
    quantity: number
    price: number
    crafterId: ObjectId
    crafterName: string
  }]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryOption: 'pickup' | 'delivery' | 'shipping'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  updatedAt: Date
}
```

## Troubleshooting

### "MongoServerError: bad auth"
- Check your username and password in the connection string
- Make sure special characters in password are URL-encoded

### "MongoNetworkError: connection timeout"
- Check your IP is whitelisted in MongoDB Atlas
- Verify your internet connection

### "MONGODB_URI environment variable is not defined"
- Make sure `.env.local` exists
- Restart your terminal/dev server after adding the variable

## Next Steps

After seeding:
1. ✅ Data is now in MongoDB
2. 🔄 Update the app to fetch from MongoDB (instead of mock data)
3. 🚀 Create API routes to fetch/create/update data
4. 🎨 App will use real database!

---

**Ready to seed?** Just run: `npm run seed`
