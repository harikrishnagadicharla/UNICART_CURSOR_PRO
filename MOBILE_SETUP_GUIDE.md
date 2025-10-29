# 📱 Mobile App Setup Guide - UniCart

This guide explains how to set up native iOS and Android apps using Capacitor that connect to your Vercel deployment.

## ✅ What's Been Set Up

1. ✅ Capacitor dependencies installed
2. ✅ API client utility created (`lib/api-client.ts`)
3. ✅ Zustand stores updated (authStore, cartStore)
4. ✅ Capacitor configuration created
5. ✅ Mobile meta tags added to layout
6. ✅ PWA manifest created
7. ✅ Package scripts for mobile added

## 🚀 Next Steps

### 1. Set Environment Variable in Vercel

Go to your Vercel Dashboard → Settings → Environment Variables and add:

```
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

Replace `your-app.vercel.app` with your actual Vercel deployment URL.

### 2. Initialize Capacitor (First Time Only)

```bash
# Navigate to project
cd UNICART_CURSOR_PRO

# Initialize Capacitor (if not already done)
npx cap init "UniCart" "com.unicart.app"

# Add mobile platforms
npm run cap:add:ios
npm run cap:add:android
```

### 3. Update Capacitor Configuration

Edit `capacitor.config.ts` and update the `server.url` if you want to point to your Vercel deployment during development:

```typescript
server: {
  url: 'https://your-app.vercel.app',
  cleartext: false,
  androidScheme: 'https',
  iosScheme: 'https',
},
```

**Note:** For production builds, comment out the `server` config so the app uses the built files.

### 4. Build and Sync

```bash
# Build Next.js app
npm run build

# Sync to Capacitor
npm run cap:sync
```

### 5. Open Native Projects

#### For iOS (requires macOS + Xcode):
```bash
npm run cap:ios
```

This opens Xcode where you can:
- Set bundle identifier
- Configure signing certificates
- Build and run on simulator/device
- Create production build for App Store

#### For Android (requires Android Studio):
```bash
npm run cap:android
```

This opens Android Studio where you can:
- Set package name
- Configure signing keys
- Build APK or AAB for Google Play
- Run on emulator/device

## 📝 How It Works

### API Client
The `lib/api-client.ts` automatically detects if the app is running:
- **In a browser**: Uses relative paths (`/api/auth/login`)
- **In mobile app**: Uses full URL from `NEXT_PUBLIC_API_URL` env var (`https://your-app.vercel.app/api/auth/login`)

### Stores Updated
- `authStore.ts` - Uses `apiClient.post()` for login/register
- `cartStore.ts` - Uses `apiClient.get/post/put/delete()` for cart operations

All API calls automatically:
- Include authentication tokens
- Handle errors properly
- Work on both web and mobile

## 🔧 Configuration Files

### `capacitor.config.ts`
- App ID: `com.unicart.app`
- App Name: `UniCart`
- Web Directory: `.next/static` (for built assets)

### `public/manifest.json`
- PWA manifest for installable web app
- Icons need to be added: `public/icon-192.png` and `public/icon-512.png`

## 📱 App Icons Required

Create these icon files in `public/`:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use online tools like:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/

## 🎯 Building for Production

### iOS App Store:
1. Open in Xcode: `npm run cap:ios`
2. Configure signing & bundle ID
3. Archive build (Product → Archive)
4. Submit via App Store Connect

### Google Play Store:
1. Open in Android Studio: `npm run cap:android`
2. Configure signing keys
3. Build signed AAB (Build → Generate Signed Bundle)
4. Upload to Google Play Console

## 🔄 Development Workflow

1. **Make code changes** in Next.js app
2. **Build**: `npm run build`
3. **Sync**: `npm run cap:sync`
4. **Test**: Open in Xcode/Android Studio

## 📦 Environment Variables Summary

### Vercel (Required):
- `DATABASE_URL` - Your database connection
- `JWT_SECRET` - Authentication secret
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL` - Your Vercel URL (for mobile apps)

### Local Development:
- Copy `.env.example` to `.env.local`
- Set `NEXT_PUBLIC_API_URL` to your local dev server (optional, defaults to relative paths)

## ⚠️ Important Notes

1. **Web vs Mobile**: The web version continues using relative API paths. Only mobile apps use `NEXT_PUBLIC_API_URL`.

2. **Build Output**: Next.js builds to `.next/static`. Capacitor syncs this to native projects.

3. **Capacitor Server Mode**: You can run Capacitor in "server mode" to point directly to your Vercel deployment during development. Update `capacitor.config.ts` server.url for this.

4. **Native Features**: To add native features (camera, push notifications, etc.), install Capacitor plugins:
   ```bash
   npm install @capacitor/camera
   npm install @capacitor/push-notifications
   ```

## 🐛 Troubleshooting

### API calls not working in mobile:
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify Vercel deployment is live
- Check network permissions in native app

### Build errors:
- Run `npm run build` first
- Then `npm run cap:sync`
- Clear `.next` folder and rebuild if needed

### Capacitor not detected:
- Make sure Capacitor plugins are installed
- Rebuild native projects
- Check `capacitor.config.ts` is correct

## 🎉 You're Ready!

Your Next.js app is now set up for native mobile apps. The mobile apps will connect to your Vercel deployment as the backend API, and all authentication, cart, and other features will work seamlessly.

For questions or issues, check:
- Capacitor Docs: https://capacitorjs.com/docs
- Next.js Docs: https://nextjs.org/docs
