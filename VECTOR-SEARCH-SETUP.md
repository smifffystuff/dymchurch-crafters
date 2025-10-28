# 🚀 MongoDB Atlas Vector Search Setup Guide

## Overview

This guide will help you set up MongoDB Atlas Vector Search for semantic product search using OpenAI embeddings.

## Prerequisites

- ✅ MongoDB Atlas cluster (already connected)
- ✅ OpenAI API key (already configured)
- ✅ Products in database

## Step 1: Generate Embeddings for Existing Products

First, we need to generate OpenAI embeddings for all existing products:

### Check Embedding Status

```bash
# Visit in browser or use curl:
curl http://localhost:3000/api/embeddings/generate
```

**Response:**
```json
{
  "success": true,
  "total": 24,
  "withEmbeddings": 0,
  "withoutEmbeddings": 24,
  "percentComplete": 0
}
```

### Generate Embeddings

```bash
# POST request to generate embeddings
curl -X POST http://localhost:3000/api/embeddings/generate
```

**This will:**
1. Find all products without embeddings
2. Generate a 1536-dimension vector for each product
3. Combine product name, description, materials, and category
4. Call OpenAI API to create embedding
5. Store embedding in MongoDB

**Expected output:**
```json
{
  "success": true,
  "message": "Generated 24 embeddings successfully",
  "successCount": 24,
  "errorCount": 0,
  "total": 24
}
```

**Cost estimate:**
- Model: `text-embedding-3-small`
- Cost: ~$0.00002 per 1000 tokens
- 24 products × ~100 tokens each = ~2,400 tokens
- Total cost: **< $0.01** (less than 1 cent!)

## Step 2: Create Vector Search Index in MongoDB Atlas

### 2.1 Access MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Select your cluster (the one connected to this app)
4. Click **"Browse Collections"**

### 2.2 Navigate to Search Indexes

1. Click on the **"Search"** tab (top navigation)
2. Click **"Create Search Index"**
3. Select **"JSON Editor"** (not Visual Editor)

### 2.3 Select Database and Collection

- **Database:** `crafter-showcase`
- **Collection:** `products`

### 2.4 Enter Index Configuration

**Index Name:** `vector_index`

**JSON Configuration:**
```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1536,
      "similarity": "cosine"
    }
  ]
}
```

### 2.5 Create Index

1. Click **"Next"**
2. Review the configuration
3. Click **"Create Search Index"**

**⏰ Wait time:** 1-5 minutes for index to build

### 2.6 Verify Index

Once the status shows **"Active"**, the index is ready!

You should see:
```
Index Name: vector_index
Status: ✅ Active
Type: Vector Search
Collection: products
```

## Step 3: Test Semantic Search

### 3.1 Test via API

```bash
curl -X POST http://localhost:3000/api/search/semantic \
  -H "Content-Type: application/json" \
  -d '{
    "query": "handmade gift for mom",
    "limit": 10
  }'
```

### 3.2 Test via UI

1. Visit http://localhost:3000/products
2. Check the **"Smart Search (AI-powered)"** checkbox
3. Type a natural language query: "cozy winter scarf"
4. See semantically relevant results!

## Example Queries

### Traditional Search (keyword matching):
- "pottery" → finds products with word "pottery"
- "scarf" → finds products with word "scarf"

### Semantic Search (meaning-based):
- "handmade birthday gift for mom" → finds gifts, even if "birthday" isn't in description
- "cozy winter accessory" → finds scarves, gloves, hats
- "unique home decoration" → finds art, pottery for home
- "jewelry for special occasion" → finds elegant jewelry
- "eco-friendly textile item" → finds sustainable textiles

## How It Works

### 1. **Product Embedding Generation**
```
Product: "Handmade Ceramic Mug"
Description: "Beautiful handcrafted mug perfect for coffee or tea..."
Materials: "Stoneware clay, food-safe glaze"
Category: "Pottery"

↓ Combined text ↓

"Handmade Ceramic Mug. Beautiful handcrafted mug perfect for 
coffee or tea... Made from Stoneware clay, food-safe glaze. 
Category: Pottery."

↓ OpenAI API ↓

Vector: [0.023, -0.015, 0.087, ... 1536 numbers total]
```

### 2. **Search Query Processing**
```
User types: "coffee cup for morning routine"

↓ OpenAI API ↓

Query Vector: [0.025, -0.012, 0.089, ... 1536 numbers]

↓ Vector Search ↓

Finds products with similar vectors (similar meaning)
```

### 3. **Similarity Calculation**
```
MongoDB compares vectors using cosine similarity:
- 1.0 = identical meaning
- 0.7-0.9 = very similar
- 0.5-0.7 = somewhat similar
- < 0.5 = not very similar
```

## Troubleshooting

### Issue: "Vector search index not configured"

**Solution:** Follow Step 2 to create the index

### Issue: "No results found"

**Possible causes:**
1. ✅ Check if embeddings are generated (Step 1)
2. ✅ Check if vector index is Active (Step 2)
3. ✅ Try different query
4. ✅ Check MongoDB Atlas connection

### Issue: Embeddings generation fails

**Possible causes:**
1. ❌ OpenAI API key invalid → Check .env.local
2. ❌ OpenAI API rate limit → Wait and retry
3. ❌ MongoDB connection issue → Check connection string

### Issue: Slow search

**Solutions:**
1. Reduce `numCandidates` in search query (currently 100)
2. Add more filters (category, price) to narrow results
3. Upgrade MongoDB Atlas tier for better performance

## Cost Considerations

### OpenAI Costs

**Embedding Generation:**
- One-time cost per product
- ~$0.00002 per 1000 tokens
- 100 products ≈ $0.05 (5 cents)
- 1000 products ≈ $0.50 (50 cents)

**Search Queries:**
- Cost per search query
- ~$0.00002 per 1000 tokens
- 100 searches ≈ $0.01 (1 cent)
- 1000 searches ≈ $0.10 (10 cents)

**Monthly estimate for small site:**
- 100 products: $0.05
- 1000 searches/month: $0.10
- **Total: ~$0.15/month**

### MongoDB Costs

- Vector Search available on M10+ clusters
- M10 cluster: ~$57/month (includes vector search)
- M0 Free Tier: ❌ Vector search not supported

## Maintenance

### Adding New Products

When crafters add new products, embeddings are generated automatically:

```typescript
// In your product creation code (future):
const embedding = await generateProductEmbedding({
  name: product.name,
  description: product.description,
  materials: product.materials,
  category: product.category,
})

await Product.create({
  ...product,
  embedding: embedding,
})
```

### Updating Products

If product details change, regenerate embedding:

```typescript
const embedding = await generateProductEmbedding(updatedProduct)
await Product.findByIdAndUpdate(productId, { embedding })
```

## Advanced Configuration

### Adjust Similarity Threshold

In `/api/search/semantic/route.ts`:

```typescript
$vectorSearch: {
  index: 'vector_index',
  path: 'embedding',
  queryVector: queryEmbedding,
  numCandidates: 100, // ← Increase for better recall
  limit: limit,
}
```

### Use Different Embedding Model

In `/lib/openai.ts`:

```typescript
// Current: text-embedding-3-small (1536 dimensions, cheap)
model: 'text-embedding-3-small'

// Alternative: text-embedding-3-large (3072 dimensions, more accurate, expensive)
model: 'text-embedding-3-large'

// Note: Must update numDimensions in Atlas index to match!
```

## Testing Checklist

- [ ] OpenAI API key configured
- [ ] Embeddings generated for all products
- [ ] Vector search index created in Atlas
- [ ] Index status shows "Active"
- [ ] Semantic search API returns results
- [ ] UI toggle works
- [ ] Natural language queries return relevant results
- [ ] Traditional search still works
- [ ] Filters work with semantic search

## Next Steps

1. **Generate embeddings** for existing products
2. **Create vector index** in MongoDB Atlas
3. **Test semantic search** with natural queries
4. **Compare results** with traditional search
5. **Gather user feedback** on search quality

---

**Status:** ✅ Code ready, awaiting MongoDB Atlas setup

**Priority:** High - Unique feature differentiator!
