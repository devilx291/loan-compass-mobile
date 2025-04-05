
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.9252750ea228487683f923b92a53cc4e',
  appName: 'loan-compass-mobile',
  webDir: 'dist',
  server: {
    url: 'https://9252750e-a228-4876-83f9-23b92a53cc4e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;
