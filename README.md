# Dymchurch Crafters Marketplace

A local e-commerce platform for crafters and artisans in Dymchurch, Hythe, and Romney Marsh.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Features (MVP)

- ✅ Homepage with featured products
- ✅ Product listing page
- ✅ Individual product detail pages
- ✅ Shopping cart functionality
- ✅ Crafter profiles
- ✅ Responsive design (mobile-first)
- ✅ Simulated checkout (payment integration coming soon)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Ready for Vercel

## Coming Soon

- 🔜 Clerk authentication
- 🔜 MongoDB database integration
- 🔜 Stripe payment processing
- 🔜 Vector search with OpenAI
- 🔜 Admin dashboard
- 🔜 Real image uploads

## Project Structure

```
app/
├── page.tsx              # Homepage
├── products/
│   ├── page.tsx          # Products listing
│   └── [id]/page.tsx     # Product detail
├── cart/
│   └── page.tsx          # Shopping cart
├── crafters/
│   └── page.tsx          # Crafters listing
├── layout.tsx            # Root layout
└── globals.css           # Global styles
```

## License

Private project for Dymchurch Crafters Marketplace.
