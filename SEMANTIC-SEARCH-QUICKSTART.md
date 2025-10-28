# 🚀 Quick Start: Semantic Search Setup

## ⚡ Fast Setup (5 minutes)

### Step 1: Generate Embeddings (2 min)

**Option A: Via Browser**
1. Visit: http://localhost:3000/api/embeddings/generate
2. Click POST or use this button: [Generate Embeddings]

**Option B: Via Terminal**
```powershell
# Check status
Invoke-WebRequest -Uri "http://localhost:3000/api/embeddings/generate" -Method GET

# Generate embeddings
Invoke-WebRequest -Uri "http://localhost:3000/api/embeddings/generate" -Method POST
```

**Expected:** 
```json
{
  "success": true,
  "message": "Generated 24 embeddings successfully",
  "successCount": 24
}
```

### Step 2: Create Vector Index in MongoDB Atlas (3 min)

1. **Go to Atlas:** https://cloud.mongodb.com/
2. **Your Cluster** → **Browse Collections** → **Search** tab
3. **Create Search Index** → **JSON Editor**
4. **Select:**
   - Database: `crafter-showcase`
   - Collection: `products`
5. **Index Name:** `vector_index`
6. **Paste this JSON:**
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
7. **Create** and wait ~1-2 minutes for "Active" status

### Step 3: Test It! (30 seconds)

1. Visit: http://localhost:3000/products
2. Check the ☑ **Smart Search (AI-powered)** box
3. Type: **"handmade gift for mom"**
4. See AI-powered results! ✨

## 🎯 Try These Queries

### Natural Language:
- "cozy winter scarf"
- "unique home decoration"
- "pottery mug for coffee lover"
- "jewelry for special occasion"
- "eco-friendly textile item"
- "handmade birthday gift"

### Compare Results:
1. Search with Smart Search **OFF**: "pottery"
2. Search with Smart Search **ON**: "ceramic mug for tea"
3. Notice how AI finds related items!

## ✅ Verification

### Check Everything Works:

**1. Embeddings Generated?**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/embeddings/generate" | ConvertFrom-Json
```
Should show: `"percentComplete": 100`

**2. Vector Index Active?**
- MongoDB Atlas → Search → vector_index → Status: **Active** ✅

**3. Search Works?**
```powershell
$body = @{
    query = "handmade gift"
    limit = 5
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/search/semantic" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```
Should return products!

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Vector search index not configured" | Complete Step 2 above |
| "No embeddings found" | Run Step 1 again |
| "OpenAI API error" | Check OPENAI_API_KEY in .env.local |
| Slow search | Normal first time, caches after |

## 💰 Cost Check

### Your Current Setup:
- **Products:** ~24
- **Embedding cost:** < $0.01 (less than 1 cent!)
- **Monthly searches (est. 100):** ~$0.01
- **Total:** **~$0.02/month** 🎉

Basically free for development!

## 📚 Full Documentation

- **Setup Guide:** `VECTOR-SEARCH-SETUP.md`
- **Feature Docs:** `SEMANTIC-SEARCH-COMPLETE.md`

---

**Time to Complete:** ~5 minutes  
**Difficulty:** Easy  
**Impact:** 🚀 Huge! AI-powered search!

**Ready? Let's go!** 🎯
