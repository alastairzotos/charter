import {
  CreateCustomerDto,
  CreateCustomerResponseDto,
  CreatePaymentIntentDto,
  CreateSetupIntentDto,
} from "dtos";

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

export const getOrCreateCustomer = async (name: string, email: string) => {
  const { data } = await httpClient.post<
    any,
    { data: CreateCustomerResponseDto },
    CreateCustomerDto
  >("/payments/customer", { name, email });

  return data;
};

export const createSetupIntent = async (
  bookingId: string,
  customerId: string
): Promise<string> => {
  const { data } = await httpClient.post<
    any,
    { data: string },
    CreateSetupIntentDto
  >("/payments/setup-intent", { bookingId, customerId });

  return data;
};
