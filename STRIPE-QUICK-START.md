# 🔑 Quick Start: Get Your Stripe API Keys

## Step-by-Step Instructions

### 1. Create/Login to Stripe Account
- Go to: **https://stripe.com**
- Click **"Sign up"** (or "Sign in" if you have an account)
- Complete the signup form:
  - Email: your email
  - Country: **United Kingdom**
  - Create a password

### 2. Access Your Dashboard
- After signup, you'll be taken to: **https://dashboard.stripe.com**
- Look for the **"Test mode"** toggle in the top right
- Make sure it's **ON** (should show orange/colored indicator)

### 3. Get Your API Keys
1. Click **"Developers"** in the top navigation bar
2. Click **"API keys"** in the left sidebar
3. You'll see two keys:

   **Publishable key** (safe to expose in browser)
   ```
   pk_test_51...
   ```
   
   **Secret key** (keep this private!)
   ```
   sk_test_... (click "Reveal test key" to see it)
   ```

### 4. Copy Keys to Your Project
1. Open your `.env.local` file in VS Code
2. Replace the placeholder values:

   ```bash
   # Replace this line:
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   
   # With your actual secret key:
   STRIPE_SECRET_KEY=sk_test_51abc123...
   ```

   ```bash
   # Replace this line:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
   
   # With your actual publishable key:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_abc123...
   ```

3. **Save the file** (Ctrl+S or Cmd+S)

### 5. Restart Your Dev Server
After adding the keys, restart your development server:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
npm run dev
```

---

## ✅ Verification

To verify your keys are loaded correctly, we'll create a test API endpoint that checks the connection.

---

## 🎯 What's Next?

Once you have your keys added:
1. ✅ Stripe packages installed
2. ✅ API keys in `.env.local`
3. ✅ Dev server restarted

We'll build:
- Payment Intent API endpoint
- Checkout page with Stripe Elements
- Order creation system
- Order confirmation page

---

## 🆘 Need Help?

**Can't find API keys?**
- Dashboard → Developers → API keys
- Make sure you're in **Test mode** (toggle in top right)

**Keys not working?**
- Make sure you copied the **entire** key
- No spaces before/after the key
- Secret key starts with `sk_test_`
- Publishable key starts with `pk_test_`

**Still stuck?**
- Check the Stripe docs: https://stripe.com/docs/keys
- Or let me know and I'll help troubleshoot!

---

## 📝 Test Card Numbers (For Later)

When testing payments, use these test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: `12/34` (any future date)
- CVC: `123` (any 3 digits)
- ZIP: `12345` (any 5 digits)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

More test cards: https://stripe.com/docs/testing
