import { Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BookingDto, ServiceDto } from "dtos";
import React, { useEffect } from "react";

import { PaymentForm } from "src/components/booking-payment-forms/payment-form";
import { StatusSwitch } from "src/components/status-switch";
import { useCreatePaymentIntent } from "src/state/payments";
import { useConfirmPayment } from "src/state/stripe";
import { getEnv } from "src/util/env";

const stripePromise = loadStripe(getEnv().stripePublishableKey);

interface Props {
  booking: BookingDto;
  service: ServiceDto;
}

export const BookingPayNowForm: React.FC<Props> = ({ booking, service }) => {
  const [paymentIntentCreateStatus, createPaymentIntent, clientSecret] =
    useCreatePaymentIntent((s) => [s.status, s.request, s.value]);

  const [confirmPaymentStatus, confirmPayment, errorData] = useConfirmPayment(
    (s) => [s.status, s.request, s.value]
  );

  useEffect(() => {
    if (!!booking) {
      createPaymentIntent(booking._id);
    }
  }, [booking]);

  if (!clientSecret) {
    return null;
  }

  return (
    <StatusSwitch
      status={paymentIntentCreateStatus}
      error={<Typography>There was an error setting up payments</Typography>}
    >
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <PaymentForm
          service={service}
          isLoading={confirmPaymentStatus === "fetching"}
          errorData={errorData}
          onSubmit={(stripe, elements) =>
            confirmPayment(stripe, elements, booking._id)
          }
        />
      </Elements>
    </StatusSwitch>
  );
};
