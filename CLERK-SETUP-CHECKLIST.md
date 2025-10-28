# Clerk Authentication Setup Checklist

Follow these steps to get authentication working:

## ✅ Prerequisites
- [x] Clerk package installed (`@clerk/nextjs`)
- [x] Svix package installed (for webhooks)
- [x] MongoDB connection configured

## 🔧 Clerk Dashboard Setup

### 1. Create Clerk Application
- [x] Sign up at [clerk.com](https://clerk.com)
- [x] Create a new application
- [x] Choose application name: "Crafters"

### 2. Configure Authentication Methods
- [ ] Enable Email/Password authentication
- [ ] (Optional) Enable Google OAuth
- [ ] (Optional) Enable Facebook OAuth
- [ ] Configure password requirements

### 3. Get API Keys
- [ ] Go to **API Keys** in Clerk Dashboard
- [ ] Copy **Publishable Key** (starts with `pk_test_`)
- [ ] Copy **Secret Key** (starts with `sk_test_`)
- [ ] Add both to your `.env.local` file

### 4. Configure Webhooks
- [ ] Go to **Webhooks** in Clerk Dashboard
- [ ] Click **Add Endpoint**
- [ ] For local dev, set up ngrok:
  ```bash
  ngrok http 3000
  ```
- [ ] Use webhook URL: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
- [ ] Or for production: `https://yourdomain.com/api/webhooks/clerk`
- [ ] Subscribe to events:
  - [x] `user.created`
  - [x] `user.updated`
  - [x] `user.deleted`
- [ ] Copy **Signing Secret** (starts with `whsec_`)
- [ ] Add to `.env.local` as `CLERK_WEBHOOK_SECRET`

### 5. Enable User Metadata
- [ ] Go to **User & Authentication** → **Metadata**
- [ ] Enable **Unsafe Metadata**
- [ ] This is used to store user roles

## 📝 Environment Variables

Create a `.env.local` file with these values:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# OpenAI
OPENAI_API_KEY=sk-xxxxx
```

## 🧪 Testing the Setup

### Test 1: Sign Up Flow
- [ ] Run `npm run dev`
- [ ] Navigate to `http://localhost:3000`
- [ ] Click "Sign Up"
- [ ] Create a test account with email/password
- [ ] Should redirect to onboarding page
- [ ] Select role (Customer or Crafter)
- [ ] Verify role is set correctly

### Test 2: Webhook Sync
- [ ] Check terminal for webhook logs
- [ ] Should see "User created in database: user_xxxxx"
- [ ] Check MongoDB for new user document
- [ ] Verify user data matches Clerk

### Test 3: Crafter Profile Creation
- [ ] Sign up as a crafter
- [ ] Complete profile setup form
- [ ] Should see crafter dashboard
- [ ] Verify "Pending Verification" message

### Test 4: Create Admin User
- [ ] Sign up with admin email
- [ ] Go to Clerk Dashboard → Users
- [ ] Find your user
- [ ] Click to edit
- [ ] Go to **Metadata** tab
- [ ] Add to **Unsafe Metadata**:
  ```json
  {
    "role": "admin",
    "onboardingComplete": true
  }
  ```
- [ ] Save changes
- [ ] Refresh your app
- [ ] Should see "Admin" link in header
- [ ] Navigate to `/admin`
- [ ] Should see admin dashboard

### Test 5: Admin Approval
- [ ] Create a second account as crafter
- [ ] Complete crafter profile
- [ ] Sign in as admin
- [ ] Go to admin dashboard
- [ ] Should see pending crafter
- [ ] Click "Approve"
- [ ] Sign out and back in as crafter
- [ ] Status should show "Verified"

## 🎨 Customization Options

### Customize Clerk UI
In Clerk Dashboard → **Customization**:
- [ ] Upload logo
- [ ] Choose brand colors
- [ ] Customize button styles
- [ ] Set up custom domains

### Email Templates
In Clerk Dashboard → **Emails**:
- [ ] Customize welcome email
- [ ] Customize password reset email
- [ ] Add company branding

## 🚀 Production Deployment

### Vercel Setup
- [ ] Add environment variables to Vercel
- [ ] Update webhook URL to production domain
- [ ] Test webhooks in production
- [ ] Verify all auth flows work

### Create Initial Admin
- [ ] Deploy to production
- [ ] Sign up with admin email
- [ ] Set admin role in Clerk Dashboard
- [ ] Test admin access

## ⚠️ Common Issues

### Issue: Webhook not receiving events
**Check:**
- [ ] Webhook URL is correct and accessible
- [ ] Webhook is enabled in Clerk Dashboard
- [ ] Events are subscribed correctly
- [ ] For local dev, ngrok is running

### Issue: User role not persisting
**Check:**
- [ ] Unsafe metadata is enabled in Clerk
- [ ] User.update() is being called correctly
- [ ] No errors in console

### Issue: Protected routes not working
**Check:**
- [ ] Middleware.ts is configured correctly
- [ ] Environment variables are set
- [ ] User is signed in

### Issue: Admin can't access admin routes
**Check:**
- [ ] Role is exactly "admin" (lowercase)
- [ ] Metadata is saved in Clerk
- [ ] Page refresh after role change

## 📚 Resources

- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)
- [User Metadata](https://clerk.com/docs/users/metadata)
- [Ngrok Setup](https://ngrok.com/docs/getting-started)

## ✨ What's Working

- ✅ User sign up and sign in
- ✅ Role-based access control
- ✅ Onboarding flow
- ✅ Crafter profile creation
- ✅ Admin dashboard
- ✅ Crafter approval workflow
- ✅ Protected routes
- ✅ User sync with MongoDB
- ✅ Session management

## 📋 Next Features to Implement

- [ ] Product CRUD for crafters
- [ ] Image upload for profiles
- [ ] Email notifications
- [ ] Order management
- [ ] Stripe payment integration
- [ ] Customer wishlist
- [ ] Reviews and ratings
