import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { urls } from "urls";

import { BookingModal } from "src/components/booking-modal";
import { StatusSwitch } from "src/components/status-switch";
import { FetchStatus } from "src/state/slice";
import { getEnv } from "src/util/env";

const stripePromise = loadStripe(getEnv().stripePublishableKey);

interface Props {
  paymentIntentCreateStatus?: FetchStatus;
  clientSecret: string;
  bookingId: string;
}

const InnerForm: React.FC<Props> = ({ bookingId, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          router.push(urls.user.booking(bookingId!));
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          color="success"
          disabled={isLoading || !stripe || !elements}
          variant="contained"
        >
          {isLoading ? <CircularProgress size={20} /> : "Pay now"}
        </Button>
      </Box>

      {message && (
        <div>
          <Typography variant="caption">{message}</Typography>
        </div>
      )}
    </form>
  );
};

export const BookingPaymentForm: React.FC<Props> = ({
  paymentIntentCreateStatus,
  bookingId,
  clientSecret,
}) => {
  return (
    <BookingModal>
      <StatusSwitch
        status={paymentIntentCreateStatus}
        error={<Typography>There was an error setting up payments</Typography>}
      >
        <Elements stripe={stripePromise}>
          <InnerForm bookingId={bookingId} clientSecret={clientSecret} />
        </Elements>
      </StatusSwitch>
    </BookingModal>
  );
};
