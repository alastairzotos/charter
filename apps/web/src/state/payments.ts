import { createQuery } from "@bitmetro/create-query";

import { createPaymentIntent } from "src/clients/payments.client";

export const useCreatePaymentIntent = createQuery(createPaymentIntent);
