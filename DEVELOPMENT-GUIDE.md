# Development Guide

## 📚 Quick Reference

### Project Overview
This is a Next.js 15 application built with TypeScript and Tailwind CSS for the Dymchurch Crafters Marketplace.

### Key Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: UI library

## 🏗️ Project Structure Explained

### `/app` - Next.js App Router
- **`page.tsx`**: Route pages (automatically become routes)
- **`layout.tsx`**: Shared layouts for routes
- **`[id]`**: Dynamic route segments

### `/components` - Reusable Components
- Shared UI components used across pages
- Import with `@/components/ComponentName`

### `/data` - Mock Data
- Static data used for development
- Will be replaced with database calls

### `/types` - TypeScript Definitions
- Type definitions for data structures
- Import with `@/types`

## 🎨 Styling with Tailwind

### Color Scheme
```javascript
primary: {
  50: '#fef6ee',   // Lightest
  100: '#fdecd7',
  ...
  600: '#e15014',  // Main brand color
  ...
  900: '#772b16',  // Darkest
}
```

### Common Patterns
```jsx
// Card
<div className="bg-white rounded-lg shadow-md p-6">

// Button
<button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">

// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `lg:` (≥ 1024px)

Example:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

## 🔧 Common Tasks

### Adding a New Page
1. Create file in `/app/your-route/page.tsx`
2. Export default component
3. Use Header and Footer components

Example:
```typescript
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Your content */}
      </div>
      <Footer />
    </div>
  )
}
```

### Adding a New Component
1. Create file in `/components/ComponentName.tsx`
2. Define props interface
3. Export default component

Example:
```typescript
interface ComponentProps {
  title: string
  onClick?: () => void
}

export default function Component({ title, onClick }: ComponentProps) {
  return <div>{title}</div>
}
```

### Adding Mock Data
1. Edit `/data/mockData.ts`
2. Add to existing arrays
3. Follow TypeScript types

Example:
```typescript
{
  id: 7,
  name: 'New Product',
  price: 29.99,
  crafter: 'New Crafter',
  crafterId: 1,
  category: 'Jewelry',
  description: 'Description here',
  materials: 'Materials here',
  inStock: true
}
```

### Using TypeScript Types
```typescript
import { Product, Crafter } from '@/types'

const product: Product = {
  // TypeScript will show autocomplete and errors
}
```

## 🚀 Development Commands

### Start Development Server
```bash
npm run dev
```
Runs on http://localhost:3000

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## 📁 File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Components**: `PascalCase.tsx` (e.g., `Header.tsx`)
- **Data files**: `camelCase.ts` (e.g., `mockData.ts`)
- **Types**: `index.ts` in `/types` folder

## 🎯 Code Patterns

### Server Components (Default)
```typescript
// No 'use client' directive
export default function ServerComponent() {
  // Can fetch data directly
  // No useState, useEffect, event handlers
}
```

### Client Components
```typescript
'use client'  // Required at top

import { useState } from 'react'

export default function ClientComponent() {
  const [state, setState] = useState('')
  // Can use hooks and event handlers
}
```

### Import Aliases
```typescript
import Header from '@/components/Header'  // ✅ Use @/ for root
import { Product } from '@/types'
import { mockProducts } from '@/data/mockData'
```

## 🐛 Debugging Tips

### Check Browser Console
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

### TypeScript Errors
- Red squiggly lines show type errors
- Hover over errors for details
- Use `any` as last resort (not recommended)

### Styling Issues
- Use browser DevTools to inspect elements
- Check Tailwind classes are applied
- Verify responsive classes at different widths

## 📦 Adding Dependencies

### Regular Dependencies
```bash
npm install package-name
```

### Dev Dependencies
```bash
npm install -D package-name
```

### Common Packages to Add Later
- `@clerk/nextjs` - Authentication
- `stripe` - Payments
- `mongodb` - Database
- `openai` - AI features

## 🔍 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)

## 💡 Best Practices

1. **Always use TypeScript types** - Don't use `any`
2. **Keep components small** - Split large components
3. **Use Tailwind classes** - Avoid custom CSS when possible
4. **Mobile-first design** - Style for mobile, then add `lg:` classes
5. **Reuse components** - Don't duplicate code
6. **Keep data separate** - Use `/data/mockData.ts`
7. **Use meaningful names** - Clear variable and function names
8. **Add comments** - Explain complex logic

## 🚨 Common Errors & Solutions

### "Cannot find module 'next'"
```bash
npm install
```

### Port 3000 already in use
```bash
# Kill the process on port 3000
# Or use a different port:
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Check TypeScript config
cat tsconfig.json

# Restart VS Code
# Cmd/Ctrl + Shift + P -> "Reload Window"
```

### Styling not applying
```bash
# Check Tailwind is working
# Verify globals.css imports
# Check tailwind.config.js content paths
```

## 🎓 Next Steps for Learning

1. **Understand App Router**: Read Next.js App Router docs
2. **Learn Tailwind**: Practice with Tailwind classes
3. **TypeScript basics**: Understand types and interfaces
4. **React hooks**: useState, useEffect, etc.
5. **Server vs Client components**: When to use each

---

**Happy Coding! 🎉**

For questions or issues, refer to the official documentation or the PRD.md file.
