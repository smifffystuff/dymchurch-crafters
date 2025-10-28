# 🎨 Crafter Profile Page - Visual Guide

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION HEADER (existing)                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CRAFTER PROFILE CARD                                       │
│  ┌────────────┬────────────────────────────────────────┐   │
│  │            │  ✓ Verified Crafter                     │   │
│  │  Profile   │  Sarah Thompson                         │   │
│  │   Image    │  Pottery & Ceramics                     │   │
│  │  (Circle)  │                                          │   │
│  │            │  📍 Hythe   📦 12 Products   ✉️ Contact │   │
│  │            │                                          │   │
│  └────────────┤  Bio: Passionate about creating...      │   │
│               │  beautiful handcrafted ceramics...      │   │
│               └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PRODUCTS SECTION                                           │
│                                                              │
│  Products by Sarah Thompson                                 │
│  Browse all handmade items from this talented artisan       │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Product  │ │ Product  │ │ Product  │ │ Product  │      │
│  │  Card    │ │  Card    │ │  Card    │ │  Card    │      │
│  │          │ │          │ │          │ │          │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Product  │ │ Product  │ │ Product  │ │ Product  │      │
│  │  Card    │ │  Card    │ │  Card    │ │  Card    │      │
│  │          │ │          │ │          │ │          │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  ← Back to All Crafters                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FOOTER (existing)                                          │
└─────────────────────────────────────────────────────────────┘
```

## Key Features Illustrated

### 1. Profile Header (Top Card)
- **Desktop Layout:** Side-by-side (image left, info right)
- **Mobile Layout:** Stacked (image top, info below)
- **Profile Image:** 192px (desktop) / 128px (mobile) circular
- **Verified Badge:** Green pill with checkmark (if applicable)
- **Name:** Large, bold heading (4xl)
- **Specialty:** Primary color, medium heading (2xl)
- **Info Icons:**
  - 📍 MapPin icon + location
  - 📦 Package icon + product count
  - ✉️ Mail icon + "Contact" (clickable link)

### 2. Products Grid
- **Desktop:** 4 columns
- **Large Tablet:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1 column
- Uses existing `ProductCard` component
- Maintains consistency with products page

### 3. Empty State (No Products)
```
┌─────────────────────────────────────┐
│           🎨 (large emoji)          │
│                                     │
│       No Products Yet               │
│                                     │
│  This crafter hasn't listed any    │
│  products yet. Check back soon!     │
│                                     │
│    [Browse All Products] button     │
└─────────────────────────────────────┘
```

### 4. 404 Page (Crafter Not Found)
```
┌─────────────────────────────────────┐
│         🔍 (search emoji)           │
│                                     │
│     Crafter Not Found               │
│                                     │
│  We couldn't find the crafter      │
│  you're looking for.                │
│                                     │
│  [View All Crafters]  [Browse]      │
└─────────────────────────────────────┘
```

## Example Data Display

### Sarah Thompson (Pottery)
```
┌──────────────────────────────────────────────────────┐
│  ✓ Verified Crafter                                  │
│                                                       │
│  Sarah Thompson                                      │
│  Pottery & Ceramics                                  │
│                                                       │
│  📍 Hythe   📦 12 Products   ✉️ Contact              │
│                                                       │
│  Passionate about creating beautiful handcrafted     │
│  ceramics inspired by the coastal landscape of       │
│  Romney Marsh. Each piece is unique and made with    │
│  love and care.                                      │
└──────────────────────────────────────────────────────┘
```

## Color Scheme

- **Background:** White (light) / Gray-800 (dark)
- **Text:** Gray-900 (light) / Gray-100 (dark)
- **Primary Color:** Orange-600 (specialty, links)
- **Icons:** Gray-600 / Gray-400
- **Verified Badge:** Green-100 bg / Green-800 text (light)
- **Cards:** White with shadow (light) / Gray-800 (dark)

## Responsive Breakpoints

### Mobile (< 640px)
- Profile: Vertical stack
- Image: 128px
- Products: 1 column
- Font sizes reduced

### Tablet (640px - 1023px)
- Profile: Side by side
- Image: 192px
- Products: 2 columns

### Desktop (1024px+)
- Profile: Side by side with more spacing
- Image: 192px
- Products: 3-4 columns
- Maximum width: 1280px (7xl)

## Dark Mode Support

All elements support dark mode:
- ✅ Profile card background
- ✅ Text colors
- ✅ Icon colors
- ✅ Verified badge
- ✅ Product cards
- ✅ Links and buttons
- ✅ Empty states

## Accessibility Features

- ✅ Semantic HTML (headings hierarchy)
- ✅ Alt text for images
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Focus states on interactive elements
- ✅ Sufficient color contrast
- ✅ Readable font sizes

## SEO Optimization

```html
<!-- Dynamic meta tags generated -->
<title>Sarah Thompson - Pottery & Ceramics | Dymchurch Crafters</title>
<meta name="description" content="Passionate about creating..." />
<meta property="og:title" content="Sarah Thompson - Pottery & Ceramics" />
<meta property="og:description" content="Passionate about..." />
<meta property="og:type" content="profile" />
```

## User Journey

1. **Discovery:**
   - User sees crafter on `/crafters` page
   - Clicks "View Profile →"

2. **Profile View:**
   - Lands on `/crafters/[id]`
   - Sees full profile information
   - Browses all products by this crafter

3. **Actions:**
   - Click product to view details
   - Click "Contact" to email crafter
   - Click "Back to All Crafters" to browse more

4. **Product Interaction:**
   - Click any product card
   - Goes to product detail page
   - Can add to cart from there

## Performance Optimizations

- ✅ Server-side rendering (SSR)
- ✅ Image optimization with Next.js Image
- ✅ Lazy loading for images
- ✅ Code splitting
- ✅ Prefetching for links
- ✅ Responsive images with sizes attribute
- ✅ Priority loading for above-fold content

---

**The new crafter profile pages are production-ready!** 🚀
