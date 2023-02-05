export const getEnv = () => ({
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  stripePublishableKey: process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
});
