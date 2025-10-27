# Simulated Features Documentation

This document explains which features are currently simulated (using alerts/mock data) vs. what will be real in production.

## 🎭 Currently Simulated Features

### 1. Shopping Cart
**Current Implementation**: 
- Cart state is managed with React useState
- Cart items are hardcoded in the component
- No persistence (cart resets on page refresh)
- Add to cart shows an alert

**Production Implementation**:
- Cart will be stored in MongoDB
- Cart persists across sessions
- User-specific carts with authentication
- Real-time cart updates

### 2. Payments
**Current Implementation**:
```javascript
const handleCheckout = () => {
  alert('Proceeding to checkout...\n\nThis is a simulated payment.')
}
```

**Production Implementation**:
- Stripe payment intent creation
- Secure payment form with Stripe Elements
- Payment confirmation via webhooks
- Order creation in database
- Email notifications

### 3. Product Data
**Current Implementation**:
- Mock products in `/data/mockData.ts`
- 6 hardcoded products
- Static product information

**Production Implementation**:
- Products stored in MongoDB
- Dynamic product loading
- Real-time inventory updates
- Product images stored in cloud storage
- Vector embeddings for semantic search

### 4. Crafter Profiles
**Current Implementation**:
- Mock crafters in `/data/mockData.ts`
- Static profile information
- No authentication

**Production Implementation**:
- Crafter accounts via Clerk
- Dynamic profile pages
- Editable profiles
- Product management dashboard
- Sales analytics

### 5. Authentication
**Current Implementation**:
- No authentication
- All pages are public
- No user accounts

**Production Implementation**:
- Clerk authentication
- User registration/login
- Role-based access (customer, crafter, admin)
- Protected routes
- User profiles

### 6. Images
**Current Implementation**:
```jsx
<div className="aspect-square bg-gray-200 flex items-center justify-center">
  <span className="text-gray-400">Product Image</span>
</div>
```

**Production Implementation**:
- Real product photos
- Image upload functionality
- Image optimization with Next.js Image
- Multiple images per product
- Image gallery with lightbox

### 7. Search & Filtering
**Current Implementation**:
- Dropdown filters (UI only)
- No actual filtering logic
- No search functionality

**Production Implementation**:
- MongoDB text search
- Vector search with OpenAI embeddings
- Category filtering
- Price range filtering
- Sort by price/date/popularity

### 8. Messaging
**Current Implementation**:
```jsx
<button className="w-full bg-gray-900 text-white...">
  Contact Crafter
</button>
```
- Button doesn't do anything

**Production Implementation**:
- Real-time messaging system
- Buyer-to-seller communication
- Message notifications
- Email alerts for new messages

## ✅ Real Features (Working Now)

### 1. Routing
- Next.js App Router with file-based routing
- Dynamic routes for products (`/products/[id]`)
- Client and server components

### 2. Styling
- Full Tailwind CSS implementation
- Responsive design
- Mobile-first approach
- Custom color scheme

### 3. TypeScript
- Type safety throughout
- Interfaces for Product, Crafter, CartItem
- Type checking at compile time

### 4. Component Architecture
- Reusable Header and Footer
- ProductCard component
- Clean component structure

### 5. State Management
- React useState for local state
- Props passing
- Client-side interactivity

## 🔄 Transition Plan

### Phase 1: Database (MongoDB)
1. Set up MongoDB Atlas
2. Create database schemas
3. Replace mock data with API calls
4. Implement data fetching

### Phase 2: Authentication (Clerk)
1. Install Clerk SDK
2. Add sign up/sign in pages
3. Protect routes
4. Add user profiles

### Phase 3: Payments (Stripe)
1. Install Stripe SDK
2. Create payment intent API route
3. Add Stripe Elements to checkout
4. Implement webhook handlers
5. Create order confirmation flow

### Phase 4: Image Upload
1. Set up cloud storage (Vercel Blob/S3)
2. Add image upload UI
3. Implement image processing
4. Update product forms

### Phase 5: Search & AI
1. Set up OpenAI API
2. Generate embeddings for products
3. Create vector search index in MongoDB
4. Implement semantic search UI

## 🧪 Testing Simulated Features

### To Test Cart:
1. Go to any product page
2. Click "Add to Cart"
3. You'll see an alert confirming the action
4. The cart page has pre-populated items for demo

### To Test Checkout:
1. Go to `/cart`
2. Click "Proceed to Checkout"
3. You'll see an alert explaining it's simulated

### To Test Product Details:
1. Browse products at `/products`
2. Click any product
3. Select delivery options (updates local state)
4. Change quantity (updates local state)

## 📝 Developer Notes

- All simulated features are clearly marked with alerts
- Mock data is centralized in `/data/mockData.ts`
- Component structure is ready for real API integration
- TypeScript types match future database schema
- UI is production-ready, just needs backend connection

---

**Remember**: This is an MVP for demonstration and development. 
All core functionality is designed and ready to be connected to real services.
