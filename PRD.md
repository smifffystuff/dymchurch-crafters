# Product Requirements Document (PRD)
## Dymchurch Crafters Marketplace

**Document Version:** 1.0  
**Date:** October 27, 2025  
**Status:** Draft

---

## Executive Summary

The Dymchurch Crafters Marketplace is a local e-commerce platform designed to connect crafters and artisans in the Dymchurch, Hythe, and Romney Marsh area with local customers. Unlike larger platforms like Etsy, this marketplace will focus exclusively on the local community, promoting local talent, reducing shipping costs through local pickup options, and fostering community connections.

---

## Project Goals & Objectives

### Primary Goals
1. Provide a dedicated online platform for local crafters to showcase and sell their handmade products
2. Create a community-focused alternative to large-scale marketplaces like Etsy
3. Strengthen the local economy by keeping spending within the Dymchurch, Hythe, and Romney Marsh communities
4. Make it easy for local residents to discover and purchase locally-made crafts

### Success Metrics
- Number of registered crafters on the platform
- Number of active listings
- Monthly transactions/sales volume
- User engagement (page views, time on site)
- Customer satisfaction ratings
- Repeat purchase rate

---

## Target Audience

### Primary Users

#### Crafters/Sellers
- **Demographics:** Local artisans, crafters, and makers in the Dymchurch, Hythe, and Romney Marsh area
- **Characteristics:** 
  - Create handmade items (jewelry, pottery, textiles, woodwork, art, etc.)
  - May range from hobbyists to professional artisans
  - Limited technical expertise (platform should be user-friendly)
  - Seeking local market without high fees
- **Needs:**
  - Easy way to showcase their products online
  - Affordable platform with reasonable fees
  - Ability to manage their own inventory and listings
  - Local customer base
  - Flexible delivery options (pickup, local delivery)

#### Buyers/Customers
- **Demographics:** Residents of Dymchurch, Hythe, Romney Marsh, and surrounding Kent coastal areas
- **Characteristics:**
  - Value locally-made, handcrafted items
  - Prefer supporting local businesses
  - Interested in unique, one-of-a-kind items
  - May prefer local pickup to avoid shipping costs
- **Needs:**
  - Easy discovery of local crafters and products
  - Secure payment options
  - Ability to contact sellers directly
  - Clear information about pickup/delivery options
  - Trust and transparency in transactions

---

## Core Features & Requirements

### Must-Have Features (MVP)

#### User Management
- **Authentication System (Clerk)**
  - Annymous access for customers 
  - Secure sign-up and sign-in flows
  - Social login options (Google, Facebook, etc.)
  - Email/password authentication
  - Multi-factor authentication (MFA) support
  - User profile management
  - Session management
  - Role-based access control (crafters vs. customers vs. admins)

- **Crafter Registration & Profiles**
  - Account creation for crafters
  - Profile pages with bio, photo, and craft specialty
  - Contact information display options
  - Portfolio/gallery showcase
  - Verification status/badges

- **Adminintrator Accounts**
  - Approve products
  - Approve new seller requests
  - Monitor activity

- **Customer Accounts**
  - Optional account creation for buyers
  - Order history tracking
  - Saved favorites/wishlist
  - Guest checkout option

#### Product Listings
- **Create/Edit Listings**
  - Multiple product photos (minimum 5 per listing)
  - Product title, description, and pricing
  - Categories and tags for organization
  - Inventory tracking
  - Product variations (size, color, etc.)
  - Custom fields for materials used, dimensions, etc.

- **Browse & Search**
  - Category browsing (e.g., Jewelry, Textiles, Pottery, Art, Woodwork, etc.)
  - **Semantic search functionality** powered by MongoDB Atlas Vector Search
    - Natural language product search (e.g., "handmade birthday gift for mom")
    - Similar product recommendations
    - Smart matching based on product descriptions and attributes
  - Traditional keyword search with filters
  - Featured/highlighted products
  - "New arrivals" section
  - Filter by crafter, price range, category

#### Transaction Management
- **Shopping & Checkout**
  - Shopping cart functionality
  - Secure checkout process powered by **Stripe**
  - **Payment methods supported:**
    - Credit/debit cards (Visa, Mastercard, Amex)
    - Digital wallets (Apple Pay, Google Pay)
    - UK bank payments (if needed)
  - Order confirmation emails
  - Stripe webhooks for payment status updates
  - Secure payment intent creation
  - PCI-compliant payment handling

- **Delivery Options**
  - Local pickup locations
  - Local delivery within specified radius
  - Shipping option (optional, for sellers who offer it)
  - Delivery preference selection at checkout

#### Communication
- **Messaging System**
  - Buyer-to-seller messaging
  - Inquiry about custom orders
  - Order-related communications
  - Email notifications

### Nice-to-Have Features (Future Enhancements)

- **Community Features**
  - Event calendar (craft fairs, workshops, markets)
  - Blog/news section
  - Crafter spotlights/interviews
  - Customer reviews and ratings

- **Advanced Functionality**
  - Custom order requests
  - Gift certificates/vouchers
  - Subscription boxes from multiple crafters
  - Social media integration
  - Mobile app

- **AI-Powered Features (OpenAI)**
  - **Smart Product Descriptions:** AI assistance for crafters writing product descriptions
  - **Auto-Tagging:** Automatically suggest tags/categories based on product details
  - **Image Analysis:** Analyze product photos to extract colors, materials, style
  - **Search Query Enhancement:** Improve search understanding and suggestions
  - **Product Recommendations:** AI-powered "you might also like" suggestions
  - **Customer Support Chatbot:** AI assistant to answer common questions
  - **Translation:** Auto-translate product descriptions for international visitors (future)

- **Analytics & Reporting**
  - Sales dashboard for crafters
  - Traffic analytics
  - Inventory reports
  - Financial reporting
  - Popular search terms and trends

---

## User Stories

### As a Crafter, I want to:
1. Create a profile showcasing my craft specialty and background
2. Easily upload and manage product listings with photos and descriptions
3. Set my own prices and manage inventory
4. Receive notifications when someone purchases my product
5. Communicate with potential buyers about custom orders
6. Choose how customers can receive products (pickup, delivery, shipping)
7. Track my sales and earnings
8. Update my availability and product stock easily

### As a Customer, I want to:
1. Browse local crafts by category or crafter
2. Search for specific types of items
3. View detailed product information and multiple photos
4. Save items to a wishlist for later
5. Contact crafters about custom requests
6. Securely purchase items online
7. Choose convenient pickup or delivery options
8. Track my order status
9. Leave reviews for products I've purchased

### As an Administrator, I want to:
1. Approve new crafter registrations
2. Monitor listings for quality and appropriateness
3. Manage site content and featured products
4. Handle disputes or issues between buyers and sellers
5. View platform analytics and usage statistics
6. Manage categories and site organization

---

## Technical Requirements

### Platform Considerations
- **Web-based application** (responsive design for mobile, tablet, desktop)
- **Technology Stack**
  - **Frontend Framework: Next.js 14+** (App Router) with React 18+ and TypeScript
  - **Rendering Strategy:** Hybrid SSR/SSG/ISR for optimal SEO and performance
  - **Styling: Tailwind CSS** for utility-first responsive design
  - **Backend: Next.js API Routes** (serverless functions on Vercel)
  - **Database: MongoDB** with Atlas Vector Search for semantic search capabilities
  - **Authentication: Clerk** for user management and authentication
  - **Payment Processing: Stripe** for secure online payments
  - **Hosting: Vercel** (unified hosting optimized for Next.js)
    - Frontend: Next.js build deployed to Vercel
    - Backend API: Next.js API Routes (serverless functions)
    - Database: MongoDB Atlas (cloud-hosted)
    - Static Assets: Vercel Edge Network CDN

### Security & Compliance
- Secure payment processing (PCI compliance)
- SSL/HTTPS encryption
- Data protection and privacy (GDPR compliance)
- Secure user authentication via Clerk
- Password hashing and secure storage
- Regular backups

### Performance
- Fast page load times (< 3 seconds)
- **Core Web Vitals Optimization:**
  - **LCP (Largest Contentful Paint):** < 2.5s
  - **FID (First Input Delay):** < 100ms
  - **CLS (Cumulative Layout Shift):** < 0.1
- Image optimization (WebP, lazy loading, responsive images)
- Code splitting and lazy loading of components
- Scalable architecture
- 99.9% uptime target
- Efficient vector search indexing for quick semantic search results
- Progressive Web App (PWA) capabilities for mobile installation

### Technical Architecture Details

#### Frontend Architecture (Next.js + React + TypeScript)
- **Next.js App Router Structure:**
  - File-based routing with app directory
  - Server Components by default (React Server Components)
  - Client Components for interactivity (`'use client'`)
  - Nested layouts for consistent UI structure
  - Loading and error states built-in
  - Parallel routes and intercepting routes for modals
  
- **Component Architecture:**
  - Server Components for static content (product listings, crafter profiles)
  - Client Components for interactive elements (cart, search filters, forms)
  - Shared components library
  - Custom hooks for client-side logic
  - TypeScript interfaces and types
  
- **State Management:**
  - Server state: React Server Components
  - Client state: Context API or Zustand
  - Server actions for mutations (form submissions, updates)
  - **Mobile-First Tailwind CSS** with custom design system/theme
  
- **Key Dependencies:**
  - `next` (framework)
  - `react` and `react-dom`
  - `typescript`
  - `tailwindcss`
  - `@clerk/nextjs` for authentication
  - `@stripe/stripe-js` and `@stripe/react-stripe-js` for payments
  - `@tanstack/react-query` for client-side data fetching (if needed)
  - `react-hook-form` for form management
  - `zod` for schema validation
  - `next-sitemap` for automatic sitemap generation

- **Next.js Features:**
  - **Image Optimization:** `next/image` component with automatic WebP conversion
  - **Font Optimization:** `next/font` for Google Fonts and custom fonts
  - **Metadata API:** Dynamic SEO meta tags and Open Graph
  - **Route Handlers:** API routes in app directory
  - **Streaming:** Progressive page rendering
  - **Suspense:** Loading states and code splitting
  
- **Mobile-First Development:**
  - Design mobile layouts first, then scale up
  - Touch-optimized UI components
  - Mobile navigation patterns (responsive header, bottom nav)
  - Swipe gestures for image galleries
  - Optimized forms for mobile keyboards
  - Progressive Web App (PWA) configuration

#### Backend API (Next.js API Routes + TypeScript)
- **Next.js App Router API Structure:**
  - Route handlers in `/app/api` directory
  - Each `route.ts` file handles HTTP methods (GET, POST, PUT, DELETE)
  - Full TypeScript support
  - Middleware support for authentication and validation
  - Automatic serverless deployment on Vercel

- **API Structure:**
  ```
  /app/api
    /products
      - route.ts (GET list, POST create)
      /[id]
        - route.ts (GET single, PUT update, DELETE)
    /crafters
      - route.ts (GET list)
      /[id]
        - route.ts (GET profile)
    /search
      /semantic
        - route.ts (POST vector search)
    /orders
      - route.ts (POST create order)
      /[id]
        - route.ts (GET order details)
    /stripe
      /create-payment-intent
        - route.ts
      /webhook
        - route.ts
    /clerk
      /webhook
        - route.ts
    /embeddings
      /generate
        - route.ts (POST generate embeddings)
  ```

- **Server Actions (Alternative to API Routes):**
  - Use Server Actions for mutations (create product, update profile)
  - Form submissions without API endpoints
  - Progressive enhancement
  - Type-safe with TypeScript

- **Key Dependencies:**
  - `next` (includes API route handling)
  - `@clerk/nextjs` for authentication
  - `stripe` Node.js library
  - `mongodb` driver or `mongoose` for MongoDB ODM
  - `openai` for embeddings and AI features
  - `zod` for request/response validation

- **Environment Variables (Vercel):**
  - Managed through Vercel dashboard or `.env.local`
  - `OPENAI_API_KEY` - OpenAI API key for embeddings
  - `MONGODB_URI` - MongoDB Atlas connection string
  - `CLERK_SECRET_KEY` - Clerk authentication (server)
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk (client)
  - `STRIPE_SECRET_KEY` - Stripe payments (server)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe (client)
  - `STRIPE_WEBHOOK_SECRET` - Stripe webhook verification
  - Automatic encryption and secure storage
  - Different values for development, preview, and production

#### Vercel Deployment Benefits
- **Automatic Deployments:**
  - Git integration (GitHub, GitLab, Bitbucket)
  - Automatic preview deployments for pull requests
  - Production deployment on merge to main branch
  
- **Performance:**
  - Global Edge Network CDN
  - **Automatic Next.js optimization** (built by same team)
  - Automatic image optimization via `next/image`
  - Font optimization via `next/font`
  - Incremental Static Regeneration (ISR) support
  - Edge Runtime option for ultra-fast response
  - Fast serverless function cold starts
  - Built-in caching strategies
  - Brotli compression

- **Developer Experience:**
  - Zero-config deployment for Next.js
  - Built-in CI/CD
  - Preview URLs for testing
  - Easy rollbacks
  - Real-time logs and analytics
  - **Vercel Analytics** for Core Web Vitals
  - **Vercel Speed Insights** for performance monitoring

- **SEO Features:**
  - Automatic HTTPS/SSL
  - Custom domains with automatic SSL
  - `next.config.js` for redirects and headers
  - Fast Time to First Byte (TTFB)
  - Fully crawlable by search engines (SSR/SSG)
  - Automatic sitemap generation with `next-sitemap`

#### MongoDB Database Schema
- **Collections:**
  - Users (synced from Clerk)
  - Crafters (extended profile information)
  - Products (with vector embeddings for semantic search)
  - Orders
  - Messages
  - Categories
  - StripeAccounts (for connected accounts if using Stripe Connect)

#### Vector Search Implementation
- **Product Embeddings:**
  - **OpenAI Embeddings API** for generating vector embeddings
  - Model: `text-embedding-3-small` (cost-effective) or `text-embedding-3-large` (higher accuracy)
  - Generate embeddings from product titles, descriptions, materials, and tags
  - Store embeddings in MongoDB with vector index
  - Automatically generate embeddings when products are created/updated
  
- **Embedding Generation Process:**
  1. Crafter creates/updates product
  2. Serverless function calls OpenAI API
  3. Combine product data: `${title} ${description} ${materials} ${tags}`
  4. Generate embedding vector (1536 dimensions for text-embedding-3-small)
  5. Store in MongoDB product document
  6. MongoDB Atlas Vector Search indexes the embedding

- **Search Features:**
  - Natural language queries ("cozy handknit scarf for winter")
  - Customer query converted to embedding via OpenAI
  - Vector similarity search in MongoDB
  - Find similar products automatically
  - Improved product discovery through semantic understanding
  - Combine vector search with traditional filters for hybrid search

- **OpenAI Integration:**
  - API calls made from Vercel serverless functions
  - Environment variable: `OPENAI_API_KEY` stored securely in Vercel
  - Rate limiting and error handling
  - Caching of embeddings (no need to regenerate unless product changes)
  - Cost optimization: Only generate embeddings when needed

#### Clerk Integration
- **User Synchronization:**
  - Webhook integration to sync user data between Clerk and MongoDB
  - Store additional user metadata in MongoDB
  - Maintain user roles (customer, crafter, admin)
  
- **Protected Routes:**
  - Clerk middleware for API route protection
  - Role-based access control for crafter dashboards
  - Admin panel protection
  - `<ClerkProvider>` wrapper in React app

#### Stripe Integration
- **Payment Flow:**
  1. Customer adds items to cart
  2. Checkout initiates Stripe Payment Intent
  3. Stripe Elements renders secure payment form
  4. Payment processed through Stripe
  5. Webhook confirms payment success
  6. Order status updated in database
  
- **Stripe Features:**
  - Payment Intents API for secure payments
  - Stripe Webhooks for payment events
  - Optional: Stripe Connect for marketplace model (split payments between platform and crafters)
  - Stripe Customer Portal for refunds/disputes
  - Test mode for development

- **Revenue Distribution:**
  - **Option A:** Direct payments to platform, manual payouts to crafters
  - **Option B:** Stripe Connect with automatic payment splits (recommended for marketplace)

---

## Business Model & Monetization

### Potential Revenue Models (to be decided)
1. **Commission-based:** Small percentage fee on each transaction (e.g., 5-10%)
2. **Subscription:** Monthly/annual fee for crafters to list products
3. **Listing fees:** Pay-per-listing model
4. **Freemium:** Basic listings free, premium features paid
5. **Hybrid:** Combination of low subscription + small transaction fee

### Competitive Positioning
- **Lower fees than Etsy** (Etsy charges ~6.5% transaction fee + payment processing)
- **Local focus** as key differentiator
- **Community-building** emphasis
- **No shipping required** for most transactions (local pickup)

---

## Scope & Geographic Coverage

### Initial Launch
- **Primary coverage area:** Dymchurch, Hythe, and Romney Marsh
- **Includes towns/villages such as:**
  - Dymchurch
  - Hythe
  - New Romney
  - St Mary's Bay
  - Littlestone-on-Sea
  - Burmarsh
  - Newchurch
  - Ivychurch
  - And surrounding Romney Marsh communities
- **Local delivery radius:** Approximately 15-20 miles from central Romney Marsh
- **Benefits for this area:**
  - Strong artisan community presence
  - Tourist destination (seasonal sales opportunities)
  - Close-knit community connections
  - Easy local pickup coordination

### Future Expansion
- Potential to expand to other Kent coastal communities (Folkestone, Dover, Deal)
- Network of local craft marketplaces across Kent
- Partnerships with regional craft organizations

---

## Design & User Experience

### Design Principles
- **Mobile-First Design** (primary design and development approach)
  - Design for mobile screens first (320px+)
  - Progressive enhancement for tablets and desktop
  - Touch-friendly interface elements (minimum 44px tap targets)
  - Optimized for one-handed mobile use
  - Fast loading on mobile networks
- Clean, modern, and approachable aesthetic
- Emphasis on high-quality product photography
- Easy navigation and intuitive interface
- Accessibility compliance (WCAG 2.1 Level AA)
- Performance-focused (Core Web Vitals optimization)

### Responsive Breakpoints (Tailwind CSS)
- **Mobile:** 320px - 639px (primary focus)
- **Tablet:** 640px - 1023px (sm: and md:)
- **Desktop:** 1024px+ (lg: and xl:)

### Brand Identity
- Warm, community-focused tone
- Highlight local craftsmanship and quality
- Emphasize sustainability and supporting local economy
- Visual style that appeals to both crafters and customers

---

## SEO Strategy & Implementation

### Technical SEO
- **Meta Tags & Structured Data:**
  - **Next.js Metadata API** for dynamic meta tags (built-in, no react-helmet needed)
  - Static and dynamic metadata per route
  - Open Graph tags for social media sharing
  - Twitter Card metadata
  - **Schema.org structured data:**
    - Product schema for listings
    - LocalBusiness schema for crafters
    - BreadcrumbList for navigation
    - Review/Rating schema
    - Offer schema for pricing
  - JSON-LD format for structured data

- **URL Structure:**
  - Clean, descriptive URLs (e.g., `/products/handmade-pottery-mug`)
  - File-based routing ensures consistent URLs
  - Kebab-case naming convention
  - No URL parameters for primary content
  - Canonical tags to prevent duplicate content
  - Automatic trailing slash handling

- **Sitemap & Robots:**
  - Auto-generated XML sitemap with `next-sitemap`
  - Dynamic sitemap updates as products added
  - `robots.txt` for crawler guidance
  - Submit sitemap to Google Search Console
  - RSS feed for blog/news (future feature)

- **Server-Side Rendering (SSR) & Static Generation (SSG):**
  - **Product pages:** SSG with ISR (revalidate every hour)
  - **Crafter profiles:** SSG with ISR
  - **Category pages:** SSG with ISR
  - **Search results:** SSR for real-time results
  - **Homepage:** SSG with ISR for featured products
  - **Blog posts:** SSG (future)
  - Fully rendered HTML for search engines (no client-side rendering delay)

- **Performance for SEO:**
  - Core Web Vitals optimization (ranking factor)
  - Mobile-first indexing ready
  - Fast server response times with Edge functions
  - `next/image` for optimized images with automatic alt text
  - Lazy loading for below-the-fold content
  - Font optimization with `next/font`
  - Automatic code splitting

### Content SEO
- **Product Pages:**
  - Unique, descriptive product titles
  - Detailed product descriptions (minimum 150 words encouraged)
  - Alt text for all product images
  - User-generated reviews (SEO value)
  - Related products linking

- **Crafter Profiles:**
  - Unique bio/about sections
  - Rich content about craft specialty
  - Location information (local SEO)
  - Social proof and credentials

- **Category Pages:**
  - Descriptive category content
  - Filter-friendly URLs
  - Internal linking structure
  - Category descriptions

### Local SEO
- **Google Business Profile** integration consideration
- **Location-based keywords:**
  - "Dymchurch crafts", "Hythe artisans", "Romney Marsh handmade"
  - "Kent coastal crafts", "New Romney gifts"
  - "Hythe pottery", "Dymchurch jewelry", etc.
- Local schema markup with area coverage
- NAP (Name, Address, Phone) consistency
- Local backlink opportunities:
  - Visit Romney Marsh website
  - Hythe community sites
  - Kent tourism sites
  - Local blogs and news outlets
  - Chamber of Commerce listings
- Community event participation (local craft fairs, farmers markets)

### Mobile SEO
- **Mobile-First Indexing Ready:**
  - Same content on mobile and desktop
  - Responsive design with Tailwind
  - Mobile-friendly navigation
  - Fast mobile load times with Next.js optimization
  - Touch-friendly interface
  - No intrusive interstitials

### Next.js SEO Advantages
- **Server-Side Rendering Benefits:**
  - Search engines receive fully rendered HTML
  - No JavaScript execution required for crawling
  - Instant content visibility to bots
  - Better indexing and ranking potential
  
- **Static Generation Benefits:**
  - Lightning-fast page loads
  - Pre-rendered pages cached globally
  - Incremental Static Regeneration keeps content fresh
  - Reduced server load

- **Built-in Optimizations:**
  - Automatic image optimization (WebP, responsive sizes)
  - Font optimization (no layout shift)
  - Script optimization (`next/script` component)
  - Automatic prefetching of linked pages
  - Critical CSS inlining

### Analytics & Monitoring
- **Google Search Console:** Monitor indexing, search performance
- **Google Analytics 4:** Track user behavior, conversions
- **Vercel Analytics:** Core Web Vitals monitoring
- **SEO Tools:** Ahrefs, SEMrush, or Moz (optional)

### Content Marketing for SEO
- Blog section (future):
  - Crafter stories and interviews
  - "How it's made" content
  - Local community news
  - Craft tutorials
  - All driving organic traffic and backlinks

---

## Timeline & Milestones (Preliminary)

### Phase 1: Planning & Design (4-6 weeks)
- Finalize requirements and features
- Create mobile-first wireframes and mockups
- Design mobile UI components first
- Develop brand identity
- Select technology stack ✅
- Plan SEO strategy and content structure

### Phase 2: Development - MVP (8-12 weeks)
- Set up development environment
- **Initialize Next.js 14+ project** with TypeScript and Tailwind CSS
- Configure Next.js App Router structure
- Set up MongoDB Atlas and vector search indexes
- Build core features:
  - User management (Clerk integration)
  - Product listings (with Server Components)
  - Crafter profiles (SSG with ISR)
  - Semantic search (OpenAI embeddings + MongoDB vector search)
  - Shopping cart and checkout (Stripe integration)
- Implement mobile-first responsive components
- Set up API routes and Server Actions
- Implement SEO foundations:
  - Metadata API for dynamic meta tags
  - Structured data (JSON-LD)
  - Automatic sitemap generation
  - OpenGraph and Twitter cards
- Configure image optimization with `next/image`
- Accessibility testing (WCAG 2.1 AA)
- Set up Vercel deployment pipeline

### Phase 3: Testing (3-4 weeks)
- User acceptance testing (mobile and desktop)
- Mobile device testing (various screen sizes)
- Performance testing (Core Web Vitals)
- SEO audit and optimization
- Security testing
- Cross-browser testing
- Bug fixes

### Phase 4: Beta Launch (4-6 weeks)
- Invite initial group of crafters
- Gather feedback on mobile experience
- Monitor analytics and SEO indexing
- Iterate on features
- Performance monitoring
- Submit sitemap to search engines

### Phase 5: Public Launch
- Marketing campaign (local focus)
- Official launch event
- SEO content marketing begins
- Ongoing support and maintenance
- Feature enhancements based on feedback
- Monitor search rankings and optimize

---

## Risks & Mitigation

### Potential Risks
1. **Low crafter adoption:** Insufficient number of crafters sign up
   - *Mitigation:* Pre-launch outreach, local events, partnerships with craft groups

2. **Competition from Etsy/Facebook Marketplace:** Users stick with familiar platforms
   - *Mitigation:* Emphasize local focus, lower fees, community benefits

3. **Technical issues:** Bugs, security vulnerabilities, downtime
   - *Mitigation:* Thorough testing, security audits, reliable hosting

4. **Payment processing complications:** Complex setup or high fees
   - *Mitigation:* Research options early, consider multiple providers

5. **Trust and safety concerns:** Fraud, disputes, quality issues
   - *Mitigation:* Clear policies, dispute resolution process, crafter verification

---

## Open Questions & Decisions Needed

1. **Payment model:** Commission-based, subscription, or hybrid?
2. **Stripe payment distribution:** Use Stripe Connect for automatic splits, or manual payouts to crafters?
3. **Crafter vetting:** Open registration or approval process?
4. **Delivery logistics:** How to handle coordination between buyers and sellers?
5. **Customer support:** What level of support will be provided? By whom?
6. **Legal structure:** Terms of service, liability, seller agreements
7. **Marketing budget:** What resources are available for promotion?
8. **Embedding model:** OpenAI embeddings (paid) vs. open-source alternatives for semantic search?
9. **State management:** Context API, Zustand, Redux, or other?

## Technology Decisions Made ✅

- ✅ **Framework:** Next.js 14+ (App Router)
- ✅ **Frontend:** React 18+ with TypeScript
- ✅ **Styling:** Tailwind CSS (Mobile-First)
- ✅ **Backend:** Next.js API Routes (serverless functions)
- ✅ **Database:** MongoDB with Atlas Vector Search
- ✅ **Authentication:** Clerk
- ✅ **Payments:** Stripe
- ✅ **Hosting:** Vercel (optimized for Next.js)
- ✅ **AI/Embeddings:** OpenAI API (text-embedding-3-small/large)
- ✅ **Design Approach:** Mobile-First Architecture
- ✅ **SEO Strategy:** SSR/SSG with comprehensive optimization
- ✅ **Rendering:** Hybrid (SSR for dynamic, SSG/ISR for static content)

---

## OpenAI Integration Details

### Current Implementation (MVP)
**Semantic Search via Embeddings**
- Use OpenAI's `text-embedding-3-small` model (cost-effective, 1536 dimensions)
- Alternative: `text-embedding-3-large` for higher accuracy (3072 dimensions)

**Cost Estimates:**
- `text-embedding-3-small`: ~$0.02 per 1M tokens
- Typical product (title + description): ~200-500 tokens
- Example: 1,000 products = ~$0.01-0.02 to generate all embeddings
- Search queries: negligible cost (few tokens each)

**Implementation Approach:**
1. When crafter creates product → generate embedding → store in MongoDB
2. When customer searches → convert query to embedding → vector search
3. Cache embeddings (only regenerate if product updated)

### Future AI Features (Post-MVP)
- **GPT-4 for product description assistance** (optional helper for crafters)
- **Vision API for image analysis** (auto-detect product attributes from photos)
- **GPT-4o-mini for chatbot** (customer support automation)

### API Usage Considerations
- **Rate Limits:** OpenAI has generous limits (tier-based)
- **Latency:** Embedding generation: ~100-300ms per request
- **Error Handling:** Fallback to keyword search if OpenAI unavailable
- **Monitoring:** Track API usage through OpenAI dashboard

---

## Appendix

### Competitive Analysis

#### Etsy
- **Strengths:** Established platform, large user base, robust features
- **Weaknesses:** High fees, global competition, impersonal
- **Differentiation:** We offer local focus, lower fees, community connection

#### Facebook Marketplace
- **Strengths:** Free, large existing user base, easy to use
- **Weaknesses:** Not craft-specific, limited features, trust issues, no dedicated storefront
- **Differentiation:** Professional platform, curated crafters, better product showcase

#### Local Craft Fairs
- **Strengths:** Face-to-face interaction, community events, tactile experience
- **Weaknesses:** Limited time/location, weather-dependent, setup required
- **Differentiation:** 24/7 availability, broader reach, lower overhead for crafters

### Potential Features for Future Consideration
- Virtual craft workshops/classes
- Craft supply marketplace
- Collaboration tools for crafters
- Wholesale ordering for retailers
- Gift registry functionality
- Charity/fundraising integration

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 27, 2025 | Initial Draft | First version of PRD |

---

## Approval & Sign-off

_To be completed once requirements are finalized_

- [ ] Product Owner
- [ ] Development Lead
- [ ] Design Lead
- [ ] Stakeholders

