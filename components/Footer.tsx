import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Dymchurch Crafters</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Supporting local artisans in Dymchurch, Hythe, and Romney Marsh
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/products" className="hover:text-white dark:hover:text-gray-300 transition">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white dark:hover:text-gray-300 transition">Categories</Link></li>
              <li><Link href="/crafters" className="hover:text-white dark:hover:text-gray-300 transition">Crafters</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/about" className="hover:text-white dark:hover:text-gray-300 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white dark:hover:text-gray-300 transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white dark:hover:text-gray-300 transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Crafters</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/sell" className="hover:text-white dark:hover:text-gray-300 transition">Start Selling</Link></li>
              <li><Link href="/seller-guide" className="hover:text-white dark:hover:text-gray-300 transition">Seller Guide</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2025 Dymchurch Crafters Marketplace. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
