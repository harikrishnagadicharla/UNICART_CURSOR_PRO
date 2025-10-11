# 🔧 Environment Variables for Vercel

## Required Environment Variables

Go to your Vercel dashboard → Settings → Environment Variables and add these:

### **Production Environment Variables:**

```
NEXT_PUBLIC_APP_NAME=UniCart
NEXT_PUBLIC_APP_URL=https://unicart-cursor-pro.vercel.app
NODE_ENV=production
```

### **How to Add:**

1. Go to your Vercel dashboard
2. Click on your project "unicart-cursor-pro"
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add each variable above
6. Set **Environment** to "Production"
7. Click **Save**

### **After Adding Variables:**

1. Go to **Deployments** tab
2. Click the **three dots** on the latest deployment
3. Click **Redeploy**
4. Wait for the new deployment to complete

## ✅ This Should Fix the 404 Error!

The 404 error was caused by:
- ❌ Complex `next.config.js` with experimental features
- ❌ Missing environment variables
- ❌ Build configuration conflicts

**Now fixed with:**
- ✅ Simplified `next.config.js` 
- ✅ Clean build process
- ✅ Proper environment variables
