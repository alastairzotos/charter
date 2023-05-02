import getConfig from "next/config";

export const getEnv = () => ({
  apiUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_API_URL as string,
  fbAppId: getConfig().publicRuntimeConfig.NEXT_PUBLIC_FB_APP_ID as string,
  googleClientId: getConfig().publicRuntimeConfig
    .NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  sentryDsn: getConfig().publicRuntimeConfig.NEXT_PUBLIC_SENTRY_DSN,
});
