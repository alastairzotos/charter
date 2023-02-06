import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { urls } from "urls";

import { BookingModal } from "src/components/booking-modal";
import { StatusSwitch } from "src/components/status-switch";
import { FetchStatus } from "src/state/slice";
import { getEnv } from "src/util/env";

interface Props {
  paymentIntentCreateStatus?: FetchStatus;
  clientSecret: string;
  bookingId: string;
}

const InnerForm: React.FC<Props> = ({ bookingId, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${getEnv().appUrl}${urls.user.booking(bookingId!)}`,
      },
    });

    if (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Payment
        </Typography>

        <PaymentElement
          options={{
            readOnly: isLoading,
          }}
        />

        <Button
          sx={{ mt: 2 }}
          type="submit"
          color="success"
          disabled={isLoading || !stripe || !elements}
          variant="contained"
        >
          {isLoading ? <CircularProgress size={20} /> : "Pay now"}
        </Button>
      </Box>

      {error && (
        <div>
          <Typography variant="caption">{error}</Typography>
        </div>
      )}
    </form>
  );
};

const stripePromise = loadStripe(getEnv().stripePublishableKey);

export const BookingPaymentForm: React.FC<Props> = ({
  paymentIntentCreateStatus,
  bookingId,
  clientSecret,
}) => {
  return (
    <BookingModal sx={{ maxWidth: 500 }}>
      <StatusSwitch
        status={paymentIntentCreateStatus}
        error={<Typography>There was an error setting up payments</Typography>}
      >
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <InnerForm bookingId={bookingId} clientSecret={clientSecret} />
        </Elements>
      </StatusSwitch>
    </BookingModal>
  );
};
