# Webhook 400 Error Troubleshooting

## Issue
Webhook is receiving `user.deleted` events but returning 400 errors (2 failed attempts visible in Clerk logs).

## Most Likely Cause
**The webhook signing secret is incorrect or outdated.**

## Quick Fix

### Step 1: Get Fresh Webhook Secret from Clerk

1. Go to **Clerk Dashboard**: https://dashboard.clerk.com
2. Click **Webhooks** in left sidebar
3. Click on your webhook endpoint
4. Look for **"Signing Secret"** section
5. Click **"Show"** to reveal the secret
6. It should start with `whsec_`
7. **Copy the entire secret**

### Step 2: Update .env.local

1. Open `.env.local` in your project
2. Find the line: `CLERK_WEBHOOK_SECRET=whsec_...`
3. Replace with the new secret you just copied
4. **Save the file**

### Step 3: Restart Your Dev Server

**IMPORTANT:** You must restart the server for the new secret to take effect!

```powershell
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test Again

1. Go to Clerk Dashboard → Users
2. Create a new test user (or use existing)
3. Delete the test user
4. Watch your terminal for logs

You should now see:
```
📨 Webhook received: user.deleted
🗑️  Attempting to delete user from database: user_xxxxx
✅ Found user in database: test@example.com
✅ User deleted from database: user_xxxxx test@example.com
```

## Enhanced Error Logging

I've added detailed error logging to help diagnose issues:

- **Signature verification errors** now show webhook secret status
- **User deletion** now shows the full event data
- **All errors** now include error messages and stack traces

## Common 400 Error Causes

### 1. Wrong Webhook Secret ⚠️ MOST COMMON
**Symptom:** Every webhook returns 400  
**Solution:** Update `CLERK_WEBHOOK_SECRET` in `.env.local` and restart server

### 2. Missing Svix Headers
**Symptom:** Error says "Missing svix headers"  
**Solution:** Check webhook URL is correct in Clerk dashboard

### 3. Signature Verification Failed
**Symptom:** Error says "Invalid signature"  
**Solution:** 
- Verify webhook secret matches Clerk
- Check ngrok URL hasn't changed (if using ngrok)
- Restart dev server after changing secret

### 4. ngrok URL Changed
**Symptom:** Worked before, now returning 400  
**Solution:**
- ngrok URLs change on every restart
- Get new ngrok URL: `ngrok http 3000`
- Update webhook URL in Clerk dashboard
- Update webhook secret if needed

## How to Check If It's Fixed

### In Clerk Dashboard
1. Go to Webhooks → Your endpoint → Logs
2. Recent events should show **200 (Success)** instead of 400
3. Click on a successful event to see the response

### In Your Terminal
You should see successful deletion logs:
```
📨 Webhook received: user.deleted
🗑️  Attempting to delete user from database: user_2xxx
✅ Found user in database: test@example.com
✅ User deleted from database: user_2xxx test@example.com
```

### In MongoDB
1. Check Users collection
2. Deleted user should be gone
3. If they had a crafter profile, that should be gone too

## Still Getting 400 Errors?

If you still see 400 errors after updating the secret, check terminal for:

```
❌ Error verifying webhook signature: [error details]
Webhook secret exists? true
Webhook secret length: 43
```

This tells you:
- If the secret is loaded (should be `true`)
- Secret length (should be ~40-50 characters)
- Exact error from Svix verification

## Webhook Secret Validation

Your webhook secret should:
- Start with `whsec_`
- Be about 40-50 characters long
- Match EXACTLY what's in Clerk dashboard
- Have no extra spaces or quotes

**Example:**
```
CLERK_WEBHOOK_SECRET=whsec_abcd1234xyz...
```

**NOT:**
```
CLERK_WEBHOOK_SECRET="whsec_abcd1234xyz..."  ❌ No quotes
CLERK_WEBHOOK_SECRET=whsec_abcd1234xyz... ❌ No trailing space
```

## Next Steps

1. ✅ Update webhook secret from Clerk dashboard
2. ✅ Restart dev server (`npm run dev`)
3. ✅ Test with dummy user deletion
4. ✅ Check Clerk logs show 200 success
5. ✅ Verify user deleted from MongoDB

Once you see **200 success** in Clerk webhook logs, the issue is fixed! 🎉
