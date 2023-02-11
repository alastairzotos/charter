import { CreatePaymentIntentDto } from "dtos";

import { httpClient } from "src/clients/http.client";

export const createPaymentIntent = async (
  bookingId: string
): Promise<string> => {
  const { data } = await httpClient.post<
    any,
    { data: string },
    CreatePaymentIntentDto
  >("/payments/payment-intent", { bookingId });

  return data;
};
