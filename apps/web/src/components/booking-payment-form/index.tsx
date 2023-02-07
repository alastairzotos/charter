import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { BookingModal } from "src/components/booking-modal";
import { StatusSwitch } from "src/components/status-switch";
import { FetchStatus } from "src/state/slice";
import { useConfirmPayment } from "src/state/stripe";
import { getEnv } from "src/util/env";

interface InnerFormProps {
  bookingId: string;
}

const InnerForm: React.FC<InnerFormProps> = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmPaymentStatus, confirmPayment, errorData] = useConfirmPayment(
    (s) => [s.status, s.request, s.value]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await confirmPayment(stripe, elements, bookingId);
  };

  const isLoading = confirmPaymentStatus === "fetching";

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

      {errorData?.errorMessage && (
        <div>
          <Typography variant="caption">{errorData.errorMessage}</Typography>
        </div>
      )}
    </form>
  );
};

const stripePromise = loadStripe(getEnv().stripePublishableKey);

interface BookingPaymentFormProps {
  paymentIntentCreateStatus?: FetchStatus;
  clientSecret: string;
  bookingId: string;
}

export const BookingPaymentForm: React.FC<BookingPaymentFormProps> = ({
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
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <InnerForm bookingId={bookingId} />
        </Elements>
      </StatusSwitch>
    </BookingModal>
  );
};
