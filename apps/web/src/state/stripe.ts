import { Stripe, StripeElements } from "@stripe/stripe-js";
import { urls } from "urls";

import { createSlice } from "src/state/slice";
import { getEnv } from "src/util/env";

export const useConfirmPayment = createSlice<
  { errorMessage?: string },
  [stripe: Stripe, elements: StripeElements, bookingId: string | undefined]
>(null, async (stripe, elements, bookingId) => {
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${getEnv().appUrl}${urls.user.booking(bookingId!)}`,
    },
  });

  if (!!error) {
    useConfirmPayment.setState({ status: "error" });
  }

  return { errorMessage: error.message };
});
