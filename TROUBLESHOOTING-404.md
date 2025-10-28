# Troubleshooting: 404 Error on Dashboard/Setup

## Issue
Getting 404 errors when trying to access `/dashboard/setup` or `/admin` after signing up as a crafter.

## Root Cause
The middleware was using Clerk's `has()` method incorrectly for checking custom roles stored in `unsafeMetadata`.

## What Was Fixed

### 1. Updated Middleware (`middleware.ts`)
- **Before**: Used `has({ role: 'crafter' })` which doesn't work with custom metadata
- **After**: Read role directly from `sessionClaims.unsafeMetadata.role`
- Added `/onboarding` to public routes
- Added proper TypeScript typing for metadata

### 2. Updated Onboarding (`app/onboarding/page.tsx`)
- Added `user.reload()` to force session refresh after setting role
- Added small delay to ensure session is updated before redirect

## Testing Steps

### Test 1: Sign Up as Crafter
1. Open incognito/private browser window
2. Go to `http://localhost:3000`
3. Click "Sign Up"
4. Create new account with email/password
5. On onboarding page, select "I want to Sell"
6. Click "Continue"
7. **Expected**: Should redirect to `/dashboard/setup` (not 404)

### Test 2: Check User Role
1. Sign in with your account
2. Visit: `http://localhost:3000/api/debug/user`
3. Check the JSON response:
   ```json
   {
     "userId": "user_xxxxx",
     "unsafeMetadata": {
       "role": "crafter",
       "onboardingComplete": true
     },
     "role": "crafter"
   }
   ```

### Test 3: Access Dashboard
1. After signing up as crafter
2. Navigate to `http://localhost:3000/dashboard`
3. **Expected**: Should see crafter dashboard (or prompt to complete setup)

### Test 4: Create Admin User
1. Sign up with a new email
2. In Clerk Dashboard → Users → Your User → Metadata
3. Set unsafe metadata:
   ```json
   {
     "role": "admin",
     "onboardingComplete": true
   }
   ```
4. Sign out and sign in again
5. Visit `http://localhost:3000/admin`
6. **Expected**: Should see admin dashboard

## If Still Getting 404 Errors

### Option 1: Clear Clerk Session
```bash
# In browser console (F12)
window.Clerk.signOut();
# Then sign in again
```

### Option 2: Check Clerk Dashboard Session Token

The session token needs to include custom metadata:

1. Go to Clerk Dashboard
2. Navigate to **Sessions** (left sidebar)
3. Click **"Customize session token"**
4. Make sure it includes `{{user.unsafe_metadata}}`

**Default should be:**
```json
{
  "metadata": "{{user.public_metadata}}",
  "unsafe_metadata": "{{user.unsafe_metadata}}"
}
```

If it's not there, add it and save.

### Option 3: Force Session Refresh

After changing metadata in Clerk Dashboard:
1. Sign out completely
2. Clear browser cookies for `localhost`
3. Sign in again

### Option 4: Check Middleware is Working

Add console logs to `middleware.ts`:

```typescript
export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();
  
  console.log('Request path:', request.url);
  console.log('User ID:', userId);
  console.log('Session claims:', sessionClaims);
  
  // ... rest of code
});
```

Check terminal for logs when accessing protected routes.

## Common Issues

### Issue 1: Session Not Updating
**Symptom**: Role set in Clerk but middleware still doesn't recognize it  
**Solution**: 
- Sign out and sign in again
- Or call `user.reload()` after updating metadata

### Issue 2: Middleware Redirect Loop
**Symptom**: Page keeps redirecting  
**Solution**: 
- Make sure `/onboarding` is in public routes
- Check that user has role set before accessing protected routes

### Issue 3: TypeScript Errors
**Symptom**: `Property 'role' does not exist on type '{}'`  
**Solution**: 
- Cast metadata: `const metadata = sessionClaims?.unsafeMetadata as { role?: string }`

## Current Middleware Configuration

Protected routes and their requirements:

```typescript
// Public (no auth required)
- / (homepage)
- /sign-in
- /sign-up  
- /onboarding
- /products
- /crafters
- /categories

// Authenticated (any logged-in user)
- /cart

// Crafter routes (role: 'crafter' or 'admin')
- /dashboard
- /dashboard/setup
- /dashboard/products
- /api/crafters/setup
- /api/crafters/me

// Admin routes (role: 'admin' only)
- /admin
- /api/admin/*
```

## Debug API Endpoint

Use the debug endpoint to check user session:

```bash
# Visit when logged in:
http://localhost:3000/api/debug/user

# Returns:
{
  "userId": "user_xxxxx",
  "sessionClaims": { ... },
  "unsafeMetadata": {
    "role": "crafter",
    "onboardingComplete": true
  },
  "role": "crafter"
}
```

## Next Steps After Fix

1. Test sign up flow completely
2. Test crafter profile creation
3. Test admin approval workflow
4. Remove debug endpoint before production (or protect it)

## Still Need Help?

If you're still getting 404 errors:

1. Share the output of `/api/debug/user`
2. Share any console errors (browser F12)
3. Share terminal output when accessing the route
4. Check if middleware is running (should see "Compiled /middleware" in terminal)
