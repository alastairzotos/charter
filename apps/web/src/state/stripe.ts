import { createQuery } from "@bitmetro/create-query";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { urls } from "urls";

import { getEnv } from "src/util/env";

export const useConfirmPayment = createQuery(
  async (
    stripe: Stripe,
    elements: StripeElements,
    bookingId: string | undefined
  ) => {
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
  }
);
