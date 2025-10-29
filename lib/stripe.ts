/**
 * Stripe Server-Side Utilities
 * Initialize Stripe with secret key for backend operations
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover', // Use latest API version
  typescript: true,
});

/**
 * Format amount for Stripe
 * Stripe expects amounts in the smallest currency unit (pence for GBP)
 * @param amount - Amount in pounds (e.g., 25.99)
 * @returns Amount in pence (e.g., 2599)
 */
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Format amount for display
 * Convert from pence to pounds
 * @param amount - Amount in pence (e.g., 2599)
 * @returns Amount in pounds (e.g., 25.99)
 */
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}
