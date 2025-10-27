import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dymchurch Crafters Marketplace',
  description: 'Discover and buy handmade crafts from local artisans in Dymchurch, Hythe, and Romney Marsh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
