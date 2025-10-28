# User Deletion Webhook Troubleshooting

## Issue
When a user deletes their account in Clerk, the user record should also be deleted from MongoDB, but it's not happening.

## Root Cause
The Clerk webhook needs to be properly configured to send `user.deleted` events.

## Solution

### 1. Verify Webhook Configuration in Clerk Dashboard

1. Go to **Clerk Dashboard**: https://dashboard.clerk.com
2. Navigate to **Webhooks** in the left sidebar
3. Click on your webhook endpoint
4. **Check that these events are enabled:**
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted` ← **This must be checked!**
5. If `user.deleted` is not checked, enable it and click **Save**

### 2. Verify Webhook is Receiving Events

In Clerk Dashboard → Webhooks → Your endpoint:
1. Click the **"Logs"** tab
2. Look for recent events
3. Check if `user.deleted` events appear
4. If they show errors, check the error message

### 3. Test User Deletion

To test if it's working:

1. **Create a test user:**
   - Sign up with a test email (e.g., `test-delete@example.com`)
   - Choose role (customer or crafter)

2. **Delete the test user:**
   - In Clerk Dashboard → Users
   - Find the test user
   - Click the user → Click **"Delete user"**

3. **Check the terminal logs:**
   You should see:
   ```
   📨 Webhook received: user.deleted
   🗑️  Attempting to delete user from database: user_xxxxx
   ✅ User deleted from database: user_xxxxx test-delete@example.com
   ```

4. **Verify in MongoDB:**
   - Check that the user is removed from the database
   - If user had a crafter profile, that should be deleted too

### 4. Check ngrok is Running (For Local Development)

If you're testing locally:
1. Make sure ngrok is running: `ngrok http 3000`
2. The webhook URL in Clerk should match your ngrok URL
3. ngrok URLs change every time you restart, so update Clerk webhook URL if needed

### 5. Manual Cleanup (If Needed)

If you have orphaned users in MongoDB (deleted from Clerk but not from MongoDB):

**Option A: Delete via MongoDB Compass/Atlas**
- Connect to your database
- Find the Users collection
- Delete the orphaned records

**Option B: Create a cleanup script**

Create `scripts/cleanupUsers.ts`:
```typescript
import connectDB from '../lib/mongodb';
import User from '../lib/models/User';

async function cleanupOrphanedUsers() {
  await connectDB();
  
  // Get all users from MongoDB
  const users = await User.find();
  
  console.log(`Found ${users.length} users in MongoDB`);
  
  // You would need to check each against Clerk API
  // For now, just list them
  users.forEach(user => {
    console.log(`${user.email} - ${user.clerkId}`);
  });
}

cleanupOrphanedUsers();
```

## What Was Fixed

### Updated Webhook Handler
The webhook now:
1. **Logs all incoming events** for debugging
2. **Handles cascading deletes** - if user has a crafter profile, it deletes that too
3. **Provides detailed logs** so you can see exactly what's happening

### Code Changes
- Added `Crafter` import to webhook
- Enhanced logging with emojis for easy scanning
- Added crafter profile cleanup before user deletion
- Better error messages

## Testing Checklist

- [ ] `user.deleted` event enabled in Clerk webhook settings
- [ ] Webhook logs show `user.deleted` events being received
- [ ] Terminal shows deletion logs when user is deleted
- [ ] User is removed from MongoDB Users collection
- [ ] If user had crafter profile, it's also removed
- [ ] No errors in Clerk webhook logs
- [ ] ngrok running (if testing locally)

## Expected Behavior

When a user account is deleted from Clerk:

1. **Clerk sends webhook** with `user.deleted` event
2. **Webhook endpoint** receives and verifies the event
3. **Finds user** in MongoDB by `clerkId`
4. **If user has crafter profile:**
   - Deletes the crafter profile first
   - Logs: `🗑️  Deleting associated crafter profile`
5. **Deletes user** from MongoDB
6. **Logs success:** `✅ User deleted from database`

## Common Issues

### Issue 1: Webhook not receiving events
**Symptom:** No logs in terminal when deleting user  
**Solution:** 
- Check webhook is configured in Clerk
- Verify webhook URL is correct
- Check ngrok is running (local dev)

### Issue 2: Events received but failing
**Symptom:** Webhook logs show errors  
**Solution:**
- Check webhook secret is correct in `.env.local`
- Verify MongoDB connection is working
- Check terminal for specific error messages

### Issue 3: Some users deleted, some not
**Symptom:** Inconsistent deletion  
**Solution:**
- Check Clerk webhook logs for specific failed events
- Verify user exists in MongoDB before deletion attempt
- Check for database connection issues

## Next Steps

1. Enable `user.deleted` event in Clerk
2. Test with a dummy account
3. Monitor terminal logs
4. Verify deletion in MongoDB

## Production Deployment

For production:
1. Update webhook URL to production domain
2. Test webhook in production environment
3. Monitor webhook logs in Clerk dashboard
4. Set up alerting for failed webhooks
