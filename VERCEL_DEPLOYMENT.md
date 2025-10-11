# 🚀 Vercel Deployment Guide - UniCart Full-Stack

This guide ensures **ZERO deployment issues** including 404 errors, build failures, and runtime errors.

---

## 📋 Pre-Deployment Checklist

### ✅ **1. Local Build Test (CRITICAL)**
```bash
# Test if your project builds successfully
npm run build

# If build succeeds, you're ready to deploy
# If it fails, fix errors before deploying
```

### ✅ **2. Environment Variables Ready**
You'll need these for Vercel:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to "production"

---

## 🗄️ Database Setup (BEFORE Deployment)

### **Option 1: Vercel Postgres (Recommended)**
1. Go to your Vercel project
2. Click **Storage** → **Create Database** → **Postgres**
3. Copy the connection string (starts with `postgres://`)
4. Vercel will automatically add `DATABASE_URL` to environment variables

### **Option 2: Supabase (Free Alternative)**
1. Create account at https://supabase.com
2. Create new project
3. Go to **Settings** → **Database**
4. Copy **Connection String** (URI)
5. Add to Vercel environment variables

### **Option 3: Railway.app (Another Free Option)**
1. Create account at https://railway.app
2. Create new PostgreSQL database
3. Copy connection string
4. Add to Vercel environment variables

---

## 🚀 Deployment Steps

### **Method 1: Deploy via Vercel Dashboard (Easiest)**

#### **Step 1: Push to GitHub**
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Full-stack UniCart ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/unicart.git
git push -u origin main
```

#### **Step 2: Import to Vercel**
1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

#### **Step 3: Configure Build Settings**
Vercel should auto-detect, but verify:
- **Framework Preset:** Next.js
- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

#### **Step 4: Add Environment Variables**
Click **Environment Variables** and add:

```bash
# Database (REQUIRED)
DATABASE_URL=your_postgresql_connection_string_here

# JWT Secret (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Node Environment (REQUIRED)
NODE_ENV=production

# Application (OPTIONAL)
NEXT_PUBLIC_APP_NAME=UniCart
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Email (OPTIONAL - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**IMPORTANT:** 
- Copy `DATABASE_URL` exactly as provided by your database provider
- Generate a secure `JWT_SECRET` (at least 32 random characters)
- Don't use quotes around values in Vercel dashboard

#### **Step 5: Deploy**
1. Click **Deploy**
2. Wait for build to complete (2-5 minutes)
3. Vercel will show deployment URL

---

### **Method 2: Deploy via Vercel CLI**

#### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

#### **Step 2: Login**
```bash
vercel login
```

#### **Step 3: Deploy**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### **Step 4: Add Environment Variables**
```bash
# Add via CLI
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NODE_ENV

# Or add via dashboard (easier)
```

---

## 🔧 Post-Deployment Configuration

### **1. Run Database Migration**
After first deployment, you need to set up the database schema:

**Option A: Via Vercel Dashboard**
1. Go to your project → **Settings** → **Functions**
2. Add a deployment hook or run manually

**Option B: Via Local CLI (Connected to Production DB)**
```bash
# Set production DATABASE_URL in .env
DATABASE_URL="your_production_db_url"

# Run migration
npx prisma migrate deploy

# Seed database with initial data
npm run db:seed
```

### **2. Verify Deployment**
Visit these URLs to test (replace with your domain):
- `https://your-app.vercel.app` - Homepage should load
- `https://your-app.vercel.app/products` - Products page
- `https://your-app.vercel.app/login` - Login page
- `https://your-app.vercel.app/api/products` - API should return JSON

---

## 🐛 Troubleshooting Common Issues

### **Issue 1: 404 Not Found**
**Cause:** Build failed or routes not generated
**Solution:**
```bash
# Test local build
npm run build

# Check for errors in Vercel deployment logs
# Go to Vercel Dashboard → Deployments → Latest → Build Logs
```

### **Issue 2: "Cannot find module @prisma/client"**
**Cause:** Prisma client not generated during build
**Solution:**
- Verify `vercel.json` has: `"buildCommand": "prisma generate && next build"`
- Or update `package.json`:
  ```json
  "scripts": {
    "build": "prisma generate && next build"
  }
  ```

### **Issue 3: Database Connection Error**
**Cause:** Invalid `DATABASE_URL` or database not accessible
**Solution:**
- Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Check database is publicly accessible
- Test connection locally with production URL

### **Issue 4: "JWT_SECRET is not defined"**
**Cause:** Environment variable not set in Vercel
**Solution:**
- Go to Vercel Dashboard → Settings → Environment Variables
- Add `JWT_SECRET` with a secure value
- Redeploy after adding

### **Issue 5: API Routes Return 500 Error**
**Cause:** Database schema not migrated
**Solution:**
```bash
# Connect to production database
DATABASE_URL="your_production_url" npx prisma migrate deploy

# Seed data
DATABASE_URL="your_production_url" npm run db:seed
```

### **Issue 6: Images Not Loading**
**Cause:** Image domains not whitelisted
**Solution:**
- Images are already configured in `next.config.js`
- If using custom domains, add them to `images.remotePatterns`

---

## 🔒 Security Checklist Before Deployment

- [ ] **Never commit `.env` or `.env.local`** to Git
- [ ] **Use strong JWT_SECRET** (min 32 random characters)
- [ ] **Use secure database password**
- [ ] **Enable SSL** for database connection
- [ ] **Set NODE_ENV=production** in Vercel
- [ ] **Don't expose sensitive data** in API responses
- [ ] **Verify `.gitignore`** includes `.env*`

---

## 📊 Vercel Dashboard Monitoring

After deployment, monitor:
1. **Deployments** - Check build status
2. **Functions** - Monitor API response times
3. **Analytics** - Track page views and performance
4. **Logs** - Check for runtime errors

---

## 🎯 Quick Deployment Checklist

- [ ] Local build successful (`npm run build`)
- [ ] Git repository created and pushed to GitHub
- [ ] Vercel project created from GitHub repo
- [ ] Database created (Vercel Postgres/Supabase/Railway)
- [ ] Environment variables added to Vercel:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Build command set: `prisma generate && next build`
- [ ] Deployed successfully
- [ ] Database migrated: `npx prisma migrate deploy`
- [ ] Database seeded: `npm run db:seed`
- [ ] Tested all pages and API endpoints
- [ ] Admin login working (`admin@example.com` / `Admin@123`)

---

## 🚨 Common Vercel Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| **404 on all routes** | Build failed | Check build logs, fix errors, redeploy |
| **Module not found** | Missing dependency | Add to `package.json` dependencies |
| **Database error** | No DATABASE_URL | Add env var and redeploy |
| **Prisma error** | Client not generated | Update build command |
| **Auth not working** | No JWT_SECRET | Add env var and redeploy |
| **API 500 errors** | Schema not migrated | Run `prisma migrate deploy` |

---

## ✅ Successful Deployment Indicators

Your deployment is successful when:
1. ✅ Vercel shows "Deployment Ready" with green checkmark
2. ✅ Homepage loads without errors
3. ✅ All navigation links work
4. ✅ Products page displays data
5. ✅ Login/Register works
6. ✅ API endpoints return JSON (test `/api/products`)
7. ✅ Admin dashboard accessible
8. ✅ No console errors in browser
9. ✅ Images load correctly
10. ✅ Mobile responsive design works

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Prisma Deployment:** https://www.prisma.io/docs/guides/deployment

---

## 💡 Pro Tips

1. **Always test build locally** before deploying
2. **Use Vercel's preview deployments** to test changes
3. **Set up custom domain** after successful deployment
4. **Enable Vercel Analytics** for insights
5. **Use environment variables** for all secrets
6. **Monitor function logs** for API errors
7. **Keep production and development databases separate**

---

## 🎉 Your App is Live!

Once deployed, share your e-commerce platform:
- **Production URL:** `https://your-app.vercel.app`
- **Admin Access:** `admin@example.com` / `Admin@123`
- **Documentation:** Include in your README.md

**Congratulations! Your full-stack UniCart is now live on Vercel!** 🚀

