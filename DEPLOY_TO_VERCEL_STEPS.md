# 🚀 Deploy UniCart to Vercel - Step by Step

Follow these steps to deploy your app to Vercel, then update your mobile app.

## Method 1: Deploy via GitHub (Recommended) ✅

### Step 1: Push your code to GitHub

1. **Create a GitHub repository** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Click "+" → "New repository"
   - Name it `unicart` (or any name you like)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

2. **Push your code to GitHub:**

   Open terminal/command prompt in your project folder and run:

   ```bash
   cd "C:\Users\91798\Downloads\pull from repo\UNICART_CURSOR_PRO"
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - UniCart ready for deployment"
   
   # Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/unicart.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub account)

2. **Import your repository:**
   - Click "Add New" → "Project"
   - Import your GitHub repository (`unicart`)
   - Vercel will auto-detect Next.js ✅

3. **Configure environment variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add these (you have these in your `.env.local`):
     ```
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     NODE_ENV=production
     NEXT_PUBLIC_API_URL=https://your-app.vercel.app
     ```
   - **Important:** Replace `your-app.vercel.app` with your actual Vercel URL (you'll get it after first deploy)

4. **Click "Deploy"**
   - Wait 2-5 minutes for deployment
   - Vercel will show your deployment URL (e.g., `unicart-abc123.vercel.app`)

### Step 3: Update Mobile App Configuration

After deployment, update `capacitor.config.ts`:

```typescript
server: {
  url: 'https://your-actual-vercel-url.vercel.app',  // Use your real Vercel URL here
  cleartext: false,
  androidScheme: 'https',
  iosScheme: 'https',
},
```

Then run:
```bash
npm run cap:sync
```

---

## Method 2: Deploy via Vercel CLI (Alternative) 🛠️

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd "C:\Users\91798\Downloads\pull from repo\UNICART_CURSOR_PRO"
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Choose your account)
- Link to existing project? **No**
- Project name? `unicart` (or any name)
- Directory? `./` (current directory)
- Override settings? **No**

### Step 4: Add Environment Variables

After first deployment, add environment variables:

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NODE_ENV
vercel env add NEXT_PUBLIC_API_URL
```

Or add them via Vercel Dashboard → Settings → Environment Variables

### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 📋 Environment Variables Checklist

Make sure these are set in Vercel:

- [ ] `DATABASE_URL` - Your PostgreSQL connection string
- [ ] `JWT_SECRET` - A secure random string (at least 32 characters)
- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_API_URL` - Your Vercel deployment URL (e.g., `https://unicart-xyz.vercel.app`)

---

## 🔄 After Deployment

1. **Get your Vercel URL** (shown after deployment completes)

2. **Update `capacitor.config.ts`:**
   ```typescript
   url: 'https://your-actual-vercel-url.vercel.app',
   ```

3. **Sync mobile app:**
   ```bash
   npm run cap:sync
   ```

4. **Test mobile app:**
   ```bash
   npm run cap:android  # Opens Android Studio
   ```

---

## ✅ Verification

After deploying, test these URLs work:
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Products: `https://your-app.vercel.app/products`
- ✅ API: `https://your-app.vercel.app/api/products` (should return JSON)

---

## 🆘 Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Verify `DATABASE_URL` is set correctly
- Check build logs in Vercel dashboard

**404 errors?**
- Wait for deployment to complete (takes 2-5 minutes)
- Check that routes exist in your `app/` folder

**Mobile app not loading?**
- Make sure you updated `capacitor.config.ts` with correct URL
- Run `npm run cap:sync` after changing config
- Check Vercel URL is accessible (visit in browser)

---

## 🎉 Done!

Once deployed:
1. Your web app is live on Vercel 🌐
2. Mobile app can connect to it 📱
3. Everything works together! ✨

