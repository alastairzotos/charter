import getConfig from "next/config";

export const getEnv = () => ({
  appUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_APP_URL as string,
  apiUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_API_URL as string,
  stripePublishableKey: getConfig().publicRuntimeConfig
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  fbAppId: getConfig().publicRuntimeConfig.NEXT_PUBLIC_FB_APP_ID as string,
  googleClientId: getConfig().publicRuntimeConfig
    .NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
});
