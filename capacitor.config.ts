
import { CapacitorConfig } from '@capacitor/cli';

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
      launchShowDuration: 3000,
      backgroundColor: "#F5F7FA",
      showSpinner: true,
      spinnerColor: "#0F52BA"
    }
  }
};

export default config;
