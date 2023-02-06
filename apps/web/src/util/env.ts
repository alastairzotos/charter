export const getEnv = () => ({
  appUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  stripePublishableKey: process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
});
