import { CreatePaymentIntentDto } from "dtos";

import { HttpService } from "src/services/http.service";

export class PaymentsService extends HttpService {
  async createPaymentIntent(bookingId: string): Promise<string> {
    const { data } = await this.httpClient.post<
      any,
      { data: string },
      CreatePaymentIntentDto
    >("/payments/payment-intent", { bookingId });

    return data;
  }
}
