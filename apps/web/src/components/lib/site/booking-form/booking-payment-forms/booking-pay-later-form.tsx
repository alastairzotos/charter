import { Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BookingDto, ServiceDto } from "dtos";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { PaymentForm } from "components/lib/site/booking-form/booking-payment-forms/payment-form";
import { useCreateSetupIntent, useGetOrCreateCustomer } from "state/payments";
import { useConfirmSetup } from "state/stripe";
import { getEnv } from "util/env";
import { getLowestStatus } from "util/misc";

const stripePromise = loadStripe(getEnv().stripePublishableKey);

interface Props {
  booking: BookingDto;
  service: ServiceDto;
}

export const BookingPayLaterForm: React.FC<Props> = ({ booking, service }) => {
  const [customerStatus, getOrCreateCustomer, customer] =
    useGetOrCreateCustomer((s) => [s.status, s.request, s.value]);
  const [intentStatus, setupIntent, clientSecret] = useCreateSetupIntent(
    (s) => [s.status, s.request, s.value]
  );
  const [confirmStatus, confirmSetup, errorData] = useConfirmSetup((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (!!booking._id) {
      getOrCreateCustomer(booking.name, booking.email);
    }
  }, [booking._id]);

  useEffect(() => {
    if (!!customer) {
      setupIntent(booking._id, customer.id);
    }
  }, [customer]);

  if (!clientSecret) {
    return null;
  }

  return (
    <StatusSwitch
      status={getLowestStatus([customerStatus, intentStatus])}
      error={<Typography>There was an unexpected error</Typography>}
    >
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <PaymentForm
          service={service}
          errorData={errorData}
          isLoading={confirmStatus === "fetching"}
          onSubmit={(stripe, elements) =>
            confirmSetup(stripe, elements, booking._id)
          }
        />
      </Elements>
    </StatusSwitch>
  );
};
