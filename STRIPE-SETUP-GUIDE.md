# 🎯 Stripe Payment Integration - Complete Setup Guide

**Date**: October 29, 2025  
**Status**: In Progress  
**Feature**: Stripe payment processing for Dymchurch Crafters Marketplace

---

## Part 1: Create Your Stripe Account

### Step 1: Sign Up for Stripe
1. Go to **https://stripe.com**
2. Click **"Sign up"** or **"Start now"**
3. Fill in your details:
   - Email address
   - Full name
   - Country: **United Kingdom**
   - Password
4. Verify your email address

### Step 2: Choose Account Type
- Select **"I'm building a platform or marketplace"** (most relevant for your use case)
- Or select **"I want to accept payments for my business"** (simpler option)

### Step 3: Complete Business Profile (Can do later)
For development, you can skip this initially. You'll need to complete it before going live:
- Business type (sole trader, limited company, etc.)
- Business details
- Bank account information (for payouts)
- Identity verification

> **Note**: You can use **Test Mode** immediately without completing business verification!

---

## Part 2: Get Your API Keys

### Step 1: Access Your Dashboard
1. Log in to **https://dashboard.stripe.com**
2. You'll see a toggle in the top right: **"Test mode"** / **"Live mode"**
3. Make sure **"Test mode"** is ON (it should show a test data banner)

### Step 2: Get Your Test API Keys
1. Click **"Developers"** in the top navigation
2. Click **"API keys"** in the left sidebar
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

4. Click **"Reveal test key"** to see your secret key
5. Copy both keys - you'll need them in a moment

---

## Part 3: Add Stripe Keys to Your Project

### Step 1: Install Stripe Dependencies
Open your terminal and run:
```bash
npm install stripe @stripe/stripe-js
```

### Step 2: Create Environment File
1. In your project root, create a file called **`.env.local`** (if it doesn't exist)
2. Add your Stripe keys:

```bash
# Stripe API Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

⚠️ **Important**: 
- Replace `YOUR_SECRET_KEY_HERE` with your actual secret key
- Replace `YOUR_PUBLISHABLE_KEY_HERE` with your actual publishable key
- The `NEXT_PUBLIC_` prefix makes the key available to the browser (safe for publishable keys)
- **NEVER** commit `.env.local` to Git (it's already in `.gitignore`)

### Step 3: Restart Your Development Server
After adding environment variables, restart your dev server:
```bash
npm run dev
```

---

## Part 4: Configure Stripe Webhooks (We'll do this later)

Webhooks allow Stripe to notify your app about payment events. We'll set this up after implementing the basic payment flow.

---

## Part 5: Test Cards for Development

Stripe provides test card numbers that simulate different scenarios:

### Successful Payment
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Declined Payment
- **Card Number**: `4000 0000 0000 0002`
- All other fields: same as above

### 3D Secure Required
- **Card Number**: `4000 0027 6000 3184`
- Triggers authentication flow

### More Test Cards
See full list: https://stripe.com/docs/testing

---

## Part 6: Understanding the Payment Flow

Here's what we'll build:

```
1. Customer adds items to cart
   ↓
2. Customer clicks "Checkout"
   ↓
3. Frontend calls your API to create Payment Intent
   ↓
4. Your API calls Stripe to create Payment Intent
   ↓
5. Stripe returns client_secret
   ↓
6. Frontend shows Stripe payment form (secure iframe)
   ↓
7. Customer enters card details
   ↓
8. Stripe processes payment
   ↓
9. Payment succeeds → Order created in MongoDB
   ↓
10. Customer sees confirmation
```

---

## Part 7: What We'll Build

### API Routes
1. **`/api/stripe/create-payment-intent`** - Creates payment intent
2. **`/api/stripe/webhook`** - Handles Stripe events
3. **`/api/orders/route.ts`** - Creates orders in database

### Frontend Components
1. **`/app/checkout/page.tsx`** - Checkout page with Stripe Elements
2. **`/app/orders/[id]/page.tsx`** - Order confirmation page

### Database
1. **Order model** - Store completed orders

---

## Part 8: Cost Information

### Stripe Fees (UK)
- **Online payments**: 1.5% + 20p per transaction
- **No setup fees, no monthly fees**
- Only pay when you get paid

### Example
- Product costs £20.00
- Stripe fee: (£20.00 × 1.5%) + £0.20 = £0.50
- You receive: £19.50

---

## Next Steps

Once you've:
1. ✅ Created your Stripe account
2. ✅ Copied your test API keys
3. ✅ Added keys to `.env.local`
4. ✅ Installed Stripe packages

We'll start implementing the payment flow!

---

## Troubleshooting

### "Invalid API Key" Error
- Check that you copied the full key (starts with `sk_test_` or `pk_test_`)
- Make sure there are no spaces before/after the key
- Restart your dev server after adding keys

### "Test mode" vs "Live mode"
- Always use **Test mode** during development
- Test keys start with `sk_test_` and `pk_test_`
- Live keys start with `sk_live_` and `pk_live_`
- Never use live keys in development!

### Environment Variables Not Loading
- File must be named exactly `.env.local`
- Must be in project root directory
- Restart dev server after changes
- Check the file isn't named `.env.local.txt`

---

## Resources

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Docs**: https://stripe.com/docs
- **Test Cards**: https://stripe.com/docs/testing
- **Stripe Status**: https://status.stripe.com

---

**Ready to proceed?** Let me know once you have your API keys and I'll help you implement the payment flow!
