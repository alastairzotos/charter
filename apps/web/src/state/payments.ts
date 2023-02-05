import { PaymentsService } from "src/services/payments.service";
import { createSlice } from "src/state/slice";

const svc = new PaymentsService();

export const useCreatePaymentIntent = createSlice<
  string,
  [amount: number, currency: string]
>(
  null,
  async (amount, currency) => await svc.createPaymentIntent(amount, currency)
);
