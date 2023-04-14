export interface CreatePaymentIntentDto {
  bookingId: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
}

export interface CreateCustomerResponseDto {
  id: string;
  name: string;
  email: string;
}

export interface CreateSetupIntentDto {
  bookingId: string;
  customerId: string;
}
