import getConfig from "next/config";

export const getEnv = () => ({
  appUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_APP_URL as string,
  apiUrl: getConfig().publicRuntimeConfig.NEXT_PUBLIC_API_URL as string,
  stripePublishableKey: getConfig().publicRuntimeConfig
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  awsCloudfrontDomain: getConfig().publicRuntimeConfig
    .NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN as string,
  instanceId: getConfig().publicRuntimeConfig.NEXT_PUBLIC_INSTANCE_ID as string,
});
