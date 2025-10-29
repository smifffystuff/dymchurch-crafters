# Deploying to Vercel - Complete Guide

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Stripe Test API Keys (from your Stripe Dashboard)
- ✅ MongoDB Atlas connection string
- ✅ Clerk API keys
- ✅ OpenAI API key (for semantic search)
- ✅ GitHub repository with your code

## 🚀 Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already, commit and push all your changes:

```bash
git add .
git commit -m "Ready for Vercel deployment with Stripe integration"
git push origin main
```

### 2. Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or login (preferably with your GitHub account for easy integration)

### 3. Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Choose your repository: **`dymchurch-crafters`**
4. Click **"Import"**

### 4. Configure Your Project

**Framework Preset:** Next.js (should be auto-detected)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### 5. Add Environment Variables

⚠️ **CRITICAL:** Before deploying, add ALL these environment variables:

Click **"Environment Variables"** and add each of these:

#### MongoDB
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/dymchurch-crafters?retryWrites=true&w=majority
```

#### Stripe (TEST KEYS)
```
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

#### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

#### OpenAI (for semantic search)
```
OPENAI_API_KEY=sk-...
```

#### Clerk Webhook (you'll update this after deployment)
```
CLERK_WEBHOOK_SECRET=whsec_...
```

### 6. Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://your-project-name.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update Clerk Settings

After deployment, you need to update Clerk with your production domain:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **"Domains"** → Add your Vercel domain:
   - `https://your-project-name.vercel.app`
4. Update **"Paths"** to match your environment variables
5. Go to **"Webhooks"** → Edit your webhook endpoint:
   - Change from `http://localhost:3000/api/webhooks/clerk`
   - To: `https://your-project-name.vercel.app/api/webhooks/clerk`

### Update Stripe Webhook (Optional for Test Mode)

If you want to test webhooks in production:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Webhooks**
2. Click **"Add endpoint"**
3. Enter: `https://your-project-name.vercel.app/api/stripe/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Webhook Signing Secret**
6. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
7. Redeploy to apply changes

---

## 🧪 Testing in Production

### Test the Checkout Flow

1. Visit your live site: `https://your-project-name.vercel.app`
2. Browse products and add to cart
3. Go through checkout
4. Use Stripe test card: **4242 4242 4242 4242**
   - Any future expiry date
   - Any 3-digit CVC
   - Any postal code
5. Verify order confirmation page loads
6. Check Stripe Dashboard for the test payment
7. Check MongoDB Atlas for the created order

### Test Authentication

1. Try signing up with a test email
2. Verify sign-in works
3. Test protected routes (dashboard, onboarding)

### Test Crafter Features

1. Sign in as a test user
2. Complete onboarding to become a crafter
3. Add products
4. View your crafter profile

---

## 🔍 Debugging Production Issues

### View Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click on **"Deployments"**
3. Select the latest deployment
4. Click **"Build Logs"** or **"Function Logs"**

### Common Issues

#### 1. Environment Variables Not Loading
- Make sure all variables are added in Vercel Dashboard
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

#### 2. Database Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string format is correct
- Test connection string locally first

#### 3. Clerk Authentication Fails
- Ensure Clerk domain includes your Vercel URL
- Check Clerk webhook URL is updated
- Verify all Clerk env variables are set

#### 4. Stripe Payments Fail
- Confirm you're using test keys (not live keys)
- Check Stripe keys are correctly formatted
- Verify no extra spaces in environment variables

#### 5. API Routes Return 500
- Check Function Logs in Vercel
- Look for MongoDB connection errors
- Verify all required environment variables are set

---

## 📊 Monitoring Your Deployment

### Vercel Analytics (Built-in)

Vercel provides free analytics:
- Real-time traffic
- Page performance
- Web Vitals scores

Access in: Vercel Dashboard → Your Project → **Analytics**

### Stripe Dashboard

Monitor test payments:
- [Stripe Dashboard](https://dashboard.stripe.com/test/payments)
- View all test transactions
- Check payment statuses
- Test refunds

### MongoDB Atlas

Monitor database:
- [MongoDB Atlas](https://cloud.mongodb.com)
- View collections
- Check indexes
- Monitor performance

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Builds your project
# 3. Deploys to production
# 4. Updates your live site
```

### Preview Deployments

Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team/clients
- Automatic cleanup when PR is closed

---

## 🎯 Next Steps After Deployment

### Switch to Production Keys (When Ready)

1. Get production keys from Stripe
2. Update environment variables in Vercel
3. Set up production webhooks
4. Update Clerk to production mode
5. Test thoroughly before going live

### Add Custom Domain (Optional)

1. Purchase a domain (e.g., dymchurch-crafters.com)
2. In Vercel Dashboard → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate auto-generated

### Performance Optimization

- Enable Vercel Analytics
- Set up Image Optimization
- Configure caching headers
- Monitor Core Web Vitals

### Security Enhancements

- Set up rate limiting
- Configure CORS properly
- Add security headers
- Set up monitoring alerts

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] All code committed and pushed to GitHub
- [ ] MongoDB Atlas configured for remote access
- [ ] All environment variables documented
- [ ] Test keys ready (Stripe, Clerk, OpenAI)
- [ ] Clerk domain settings prepared
- [ ] No sensitive data in code (all in env vars)
- [ ] Build succeeds locally (`npm run build`)
- [ ] All dependencies in package.json

After deployment:

- [ ] Site loads successfully
- [ ] Authentication works
- [ ] Product browsing works
- [ ] Search functionality works
- [ ] Cart and checkout work
- [ ] Test payment succeeds
- [ ] Order confirmation displays
- [ ] Crafter onboarding works
- [ ] Admin features accessible

---

## 🆘 Getting Help

If you encounter issues:

1. **Vercel Logs:** Check build and function logs
2. **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
3. **Stripe Docs:** [stripe.com/docs](https://stripe.com/docs)
4. **MongoDB Docs:** [docs.mongodb.com](https://docs.mongodb.com)
5. **Clerk Docs:** [clerk.com/docs](https://clerk.com/docs)

---

## 📝 Environment Variables Quick Reference

Copy this template and fill in your actual values:

```env
# MongoDB
MONGODB_URI=

# Stripe (TEST MODE)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=

# OpenAI
OPENAI_API_KEY=
```

---

**Good luck with your deployment! 🚀**
