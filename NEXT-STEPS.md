# 📋 NEXT STEPS - Add Your MongoDB Connection String

## Step 1: Open .env.local

Open the file: `c:\Development\crafter-showcase\.env.local`

## Step 2: Paste Your MongoDB Connection String

Replace the empty `MONGODB_URI=` line with your actual connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/crafter-showcase?retryWrites=true&w=majority
```

**Make sure to:**
- Include your actual username and password
- Include the database name: `crafter-showcase`
- Keep the parameters: `?retryWrites=true&w=majority`

Example:
```env
MONGODB_URI=mongodb+srv://john:MySecretPass123@cluster0.abc12.mongodb.net/crafter-showcase?retryWrites=true&w=majority
```

## Step 3: Run the Seed Script

Open a terminal in VS Code and run:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Create collections (crafters, products)
- Insert 6 crafters and 12 products
- Display a success message

## Step 4: Start the App

```bash
npm run dev
```

Visit: http://localhost:3000

**Your app now uses real MongoDB data!** 🎉

---

## Need Help?

See `MONGODB-SETUP.md` for detailed setup instructions.
See `MONGODB-INTEGRATION.md` for technical details.
