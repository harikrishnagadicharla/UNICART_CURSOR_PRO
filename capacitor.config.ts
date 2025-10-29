import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unicart.app',
  appName: 'UniCart',
  webDir: 'public',
  server: {
    // For production: Point to your Vercel deployment URL
    // Replace 'your-app.vercel.app' with your actual Vercel URL
    // For development: Comment out server config and use local dev server
    // url: 'https://your-app.vercel.app',  // Uncomment after deploying to Vercel and replace with your URL
    cleartext: false,
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    App: {
      textZoom: 100,
    },
  },
};

export default config;
