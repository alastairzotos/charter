import { PaymentsService } from "src/services/payments.service";
import { createSlice } from "src/state/slice";

const svc = new PaymentsService();

export const useCreatePaymentIntent = createSlice<string, [bookingId: string]>(
  null,
  async (bookingId) => await svc.createPaymentIntent(bookingId)
);
