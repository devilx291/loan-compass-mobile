
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.trustfund.loans',
  appName: 'TrustFund',
  webDir: 'dist',
  server: {
    url: 'https://9252750e-a228-4876-83f9-23b92a53cc4e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#0F52BA",
      showSpinner: true,
      spinnerColor: "#FFFFFF"
    }
  },
  android: {
    buildOptions: {
      keystorePath: 'android/app/trustfund.keystore',
      keystoreAlias: 'trustfund',
    }
  }
};

export default config;
