# Authentication Implementation Guide

This document explains the authentication system implementation using Clerk for the Dymchurch Crafters Marketplace.

## Overview

The authentication system supports three user roles:
- **Customer**: Browse and purchase products (default)
- **Crafter**: Create profile, list and manage products
- **Admin**: Approve crafters, manage platform

## Features Implemented

### 1. User Authentication
- ✅ Sign up and sign in flows using Clerk
- ✅ Social login support (Google, Facebook, etc.)
- ✅ Email/password authentication
- ✅ User profile management via Clerk
- ✅ Session management
- ✅ Protected routes with middleware

### 2. Role-Based Access Control
- ✅ Customer role (default)
- ✅ Crafter role with dashboard access
- ✅ Admin role with platform management access
- ✅ Role assignment during onboarding
- ✅ Middleware protection for role-specific routes

### 3. User Onboarding
- ✅ Onboarding flow after signup
- ✅ Role selection (Customer vs Crafter)
- ✅ Crafter profile setup
- ✅ MongoDB integration for user data

### 4. Crafter Features
- ✅ Crafter profile creation
- ✅ Verification workflow (admin approval required)
- ✅ Dashboard for crafters
- ✅ Profile information management

### 5. Admin Features
- ✅ Admin dashboard
- ✅ View pending crafter applications
- ✅ Approve/reject crafter profiles
- ✅ Admin-only routes protection

## Setup Instructions

### Step 1: Create Clerk Account

1. Go to [Clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose your authentication methods (Email/Password, Google, etc.)

### Step 2: Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Clerk credentials:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

**Where to find these values:**
- Go to your Clerk Dashboard
- Navigate to **API Keys** section
- Copy the Publishable Key and Secret Key
- Webhook Secret will be created in the next step

### Step 3: Configure Clerk Webhooks

1. In Clerk Dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/clerk`
   - For local development: Use ngrok or similar service
4. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the **Signing Secret** and add it to `.env.local` as `CLERK_WEBHOOK_SECRET`

### Step 4: Configure User Metadata

In Clerk Dashboard:
1. Go to **User & Authentication** → **Metadata**
2. Enable **Unsafe Metadata** (used for storing user roles)

### Step 5: Run Database Migrations

Make sure MongoDB is running and connected:

```bash
npm run dev
```

The User model will be automatically created when the app starts.

### Step 6: Create First Admin User

To create your first admin:

1. Sign up as a normal user
2. Go to Clerk Dashboard → Users
3. Find your user
4. Edit **Unsafe Metadata** and add:
```json
{
  "role": "admin",
  "onboardingComplete": true
}
```
5. Save changes

## File Structure

```
app/
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx          # Sign in page
├── sign-up/
│   └── [[...sign-up]]/
│       └── page.tsx          # Sign up page
├── onboarding/
│   └── page.tsx              # Role selection
├── dashboard/
│   ├── page.tsx              # Crafter dashboard
│   └── setup/
│       └── page.tsx          # Crafter profile setup
├── admin/
│   └── page.tsx              # Admin dashboard
└── api/
    ├── webhooks/
    │   └── clerk/
    │       └── route.ts      # Webhook handler
    ├── crafters/
    │   ├── me/
    │   │   └── route.ts      # Get current user's crafter profile
    │   └── setup/
    │       └── route.ts      # Create crafter profile
    └── admin/
        └── crafters/
            ├── pending/
            │   └── route.ts  # Get pending crafters
            └── [id]/
                ├── approve/
                │   └── route.ts
                └── reject/
                    └── route.ts

lib/
└── models/
    ├── User.ts               # User model (syncs with Clerk)
    └── Crafter.ts            # Crafter model (updated)

components/
└── Header.tsx                # Updated with auth buttons

middleware.ts                 # Route protection
```

## User Flows

### Customer Flow
1. User signs up
2. Redirected to onboarding
3. Selects "I want to Shop"
4. Role set to "customer"
5. Redirected to homepage
6. Can browse and purchase products

### Crafter Flow
1. User signs up
2. Redirected to onboarding
3. Selects "I want to Sell"
4. Role set to "crafter"
5. Redirected to crafter profile setup
6. Fills in business details
7. Profile created (pending verification)
8. Redirected to dashboard
9. Waits for admin approval
10. Once approved, can list products

### Admin Flow
1. Admin account created manually
2. Signs in
3. Sees "Admin" link in header
4. Can view pending crafter applications
5. Approves or rejects applications
6. Approved crafters can start listing products

## Protected Routes

### Public Routes (No Auth Required)
- `/` - Homepage
- `/products` - Product listings
- `/crafters` - Crafter profiles
- `/categories` - Category browsing
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

### Authenticated Routes (Auth Required)
- `/onboarding` - Role selection
- `/cart` - Shopping cart (could be public with localStorage)

### Crafter Routes (Crafter or Admin Role Required)
- `/dashboard` - Crafter dashboard
- `/dashboard/setup` - Profile setup
- `/dashboard/products` - Manage products
- `/dashboard/profile` - Edit profile

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard
- `/admin/*` - All admin routes

## API Endpoints

### Public Endpoints
- `GET /api/products` - List products
- `GET /api/crafters` - List crafters
- `GET /api/categories` - List categories

### Authenticated Endpoints
- `GET /api/crafters/me` - Get current user's crafter profile
- `POST /api/crafters/setup` - Create crafter profile

### Admin Endpoints
- `GET /api/admin/crafters/pending` - Get pending crafters
- `POST /api/admin/crafters/[id]/approve` - Approve crafter
- `POST /api/admin/crafters/[id]/reject` - Reject crafter

### Webhook Endpoints
- `POST /api/webhooks/clerk` - Clerk user sync webhook

## Role Management

Roles are stored in Clerk's `unsafeMetadata`:

```typescript
await user.update({
  unsafeMetadata: {
    role: 'customer' | 'crafter' | 'admin',
    onboardingComplete: true,
  },
});
```

Access role in components:
```typescript
const { user } = useUser();
const userRole = user?.unsafeMetadata?.role as string;
```

## Testing

### Test Customer Flow
1. Sign up with a new email
2. Select "I want to Shop" on onboarding
3. Verify redirect to homepage
4. Check header shows sign out button

### Test Crafter Flow
1. Sign up with a new email
2. Select "I want to Sell" on onboarding
3. Fill in crafter profile form
4. Verify redirect to dashboard
5. Check "Pending Verification" message
6. Verify no products can be added yet

### Test Admin Flow
1. Create admin user (manually set role)
2. Sign in as admin
3. Verify "Admin" link appears in header
4. Navigate to admin dashboard
5. Test approve/reject functionality

## Security Notes

1. **Never expose Clerk Secret Key** - Only use on server
2. **Webhook verification** - Always verify webhook signatures
3. **Role validation** - Always check roles on server-side
4. **Middleware protection** - Routes are protected at middleware level
5. **MongoDB user sync** - Users synced via webhooks for redundancy

## Troubleshooting

### Issue: "Missing svix headers" error
**Solution**: Make sure webhook is configured correctly in Clerk Dashboard

### Issue: User not syncing to MongoDB
**Solution**: Check webhook is active and receiving events in Clerk Dashboard

### Issue: Admin can't access admin routes
**Solution**: Verify role is set to "admin" in Clerk unsafe metadata

### Issue: Crafter profile not found
**Solution**: Make sure crafter completed profile setup at `/dashboard/setup`

## Next Steps

1. **Email Notifications**: Set up email templates in Clerk for welcome emails
2. **Profile Photos**: Add image upload for crafter profiles
3. **Product Management**: Create CRUD operations for products
4. **Order Management**: Implement order tracking for customers
5. **Stripe Integration**: Add payment processing
6. **Advanced Roles**: Add more granular permissions

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router + Clerk](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Webhooks Guide](https://clerk.com/docs/integrations/webhooks)
- [Role-Based Access Control](https://clerk.com/docs/authentication/authorization)
