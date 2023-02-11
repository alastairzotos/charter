import { CreatePaymentIntentDto } from "dtos";
import { httpClient } from "src/services/http.service";

export class PaymentsService {
  async createPaymentIntent(bookingId: string): Promise<string> {
    const { data } = await httpClient.post<
      any,
      { data: string },
      CreatePaymentIntentDto
    >("/payments/payment-intent", { bookingId });

    return data;
  }
}
