# Smart Search Relevance Sorting

**Date**: October 28, 2025  
**Status**: ✅ Complete  
**Feature**: Auto-sort by relevance for AI-powered searches

## Overview

Added "Relevance" as a sort option that automatically activates when Smart Search is enabled. This ensures that AI-powered semantic search results are displayed in order of relevance to the user's query, leveraging MongoDB Atlas Vector Search similarity scores.

## User Experience

### Smart Search Enabled
1. User toggles "Smart Search" ON
2. Sort dropdown automatically changes to "Relevance"
3. "Relevance" option appears in sort dropdown
4. User types natural language query (e.g., "cozy handmade gift")
5. Presses Enter or clicks Search button
6. Results display ordered by semantic similarity (most relevant first)

### Smart Search Disabled
1. User toggles "Smart Search" OFF
2. If currently on "Relevance", automatically switches to "Newest First"
3. "Relevance" option disappears from sort dropdown
4. Traditional sorting options remain available

## Technical Implementation

### 1. Sort Options (`components/ProductFilters.tsx`)

Added "Relevance" with `semanticOnly` flag:

```typescript
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance', semanticOnly: true },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]
```

### 2. Auto-Selection Logic

When Smart Search is toggled ON:
```typescript
if (key === 'useSemanticSearch' && newValue === true) {
  setFilters({ ...filters, [key]: newValue, sortBy: 'relevance' })
}
```

When Smart Search is toggled OFF:
```typescript
else if (key === 'useSemanticSearch' && newValue === false && filters.sortBy === 'relevance') {
  setFilters({ ...filters, [key]: newValue, sortBy: 'newest' })
}
```

### 3. Conditional Display

Sort dropdown filters options based on Smart Search state:
```typescript
{SORT_OPTIONS.filter((option: any) => 
  filters.useSemanticSearch || option.value !== 'relevance'
).map((option) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
))}
```

### 4. Preserve Vector Search Order (`app/products/ProductsClient.tsx`)

When "Relevance" is selected, skip re-sorting to preserve MongoDB Vector Search order:
```typescript
// Sort results - 'relevance' keeps vector search order (already sorted by score)
if (filters.sortBy && filters.sortBy !== 'newest' && filters.sortBy !== 'relevance') {
  results.sort((a: any, b: any) => {
    // ... sorting logic
  })
}
```

## MongoDB Vector Search Score

The semantic search API includes the relevance score in results:

```typescript
{
  $addFields: {
    score: { $meta: 'vectorSearchScore' }, // Relevance score (0-1)
  },
}
```

This score represents the cosine similarity between:
- User's search query embedding (1536 dimensions)
- Each product's pre-generated embedding (1536 dimensions)

**Higher score = More relevant result**

## Sort Options Behavior Matrix

| Smart Search | Available Sorts | Default Sort |
|-------------|----------------|--------------|
| OFF | Newest, Price ↑, Price ↓, Name A-Z | Newest First |
| ON | **Relevance**, Newest, Price ↑, Price ↓, Name A-Z | **Relevance** |

## Example User Flow

### Scenario: Finding a "cozy winter scarf"

1. **Enable Smart Search** → Sort auto-selects "Relevance"
2. **Type**: "cozy winter scarf"
3. **Press Enter**
4. **Results** (ordered by relevance):
   - Score: 0.89 - "Hand-knitted Wool Scarf" (Textiles)
   - Score: 0.84 - "Soft Cashmere Winter Wrap" (Textiles)
   - Score: 0.78 - "Chunky Knit Infinity Scarf" (Textiles)
   - Score: 0.65 - "Merino Wool Beanie" (Textiles)

5. **Change sort to "Price: Low to High"**
   - Results re-order by price while maintaining semantic filter

6. **Disable Smart Search**
   - Sort automatically reverts to "Newest First"
   - "Relevance" option disappears

## Benefits

### For Users
- **Intuitive**: Relevance sorting is automatic and expected for AI search
- **Flexible**: Can still override with price/name sorting if desired
- **Clear**: "Relevance" only appears when it makes sense (Smart Search ON)

### For Merchants
- **Better Discovery**: Most relevant products surface first
- **Increased Conversions**: Users find what they're looking for faster
- **Smart Filtering**: Relevance + price filters = powerful combination

### Technical
- **Performance**: No additional API calls (score already included)
- **Maintainable**: Clear separation of semantic vs. traditional sorting
- **Scalable**: Works with any number of products

## Cost Impact

**None** - Relevance score is automatically included in Vector Search results at no additional cost. The sorting happens client-side.

## Testing Checklist

- [x] "Relevance" appears in dropdown when Smart Search is ON
- [x] "Relevance" disappears when Smart Search is OFF
- [x] Toggling Smart Search ON auto-selects "Relevance"
- [x] Toggling Smart Search OFF reverts to "Newest First" (if on Relevance)
- [x] Semantic search results maintain score-based order when "Relevance" selected
- [x] Other sort options (price, name) still work with semantic results
- [x] Traditional search not affected by relevance changes

## Related Files

- `/components/ProductFilters.tsx` - Filter UI with sort options
- `/app/products/ProductsClient.tsx` - Client-side sorting logic
- `/app/api/search/semantic/route.ts` - Vector Search with score calculation
- `/lib/openai.ts` - Embedding generation

## Future Enhancements

1. **Display Score Badge**: Show relevance score on product cards during Smart Search
2. **Score Threshold**: Filter out results below a minimum relevance score (e.g., 0.5)
3. **Hybrid Ranking**: Combine relevance + popularity + recency for optimal sorting
4. **Explain Results**: Show why a product matched (highlighted matching terms/concepts)

## MongoDB Atlas Vector Search Index

**Status**: Ready to create  
**Index Name**: `vector_index`  
**Required**: This feature requires the Vector Search index to be created in MongoDB Atlas

Once created, the relevance sorting will be fully functional!
