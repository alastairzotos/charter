import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { ServiceDto } from "dtos";
import React from "react";

interface Props {
  service: ServiceDto;
  isLoading: boolean;
  errorData: { errorMessage?: string } | null;

  onSubmit: (stripe: Stripe, elements: StripeElements) => Promise<void>;
}

export const PaymentForm: React.FC<Props> = ({
  service,
  isLoading,
  errorData,
  onSubmit,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await onSubmit(stripe, elements);
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
          {isLoading ? (
            <CircularProgress size={20} />
          ) : service.approveBookingBeforePayment ? (
            "Book now"
          ) : (
            "Pay now"
          )}
        </Button>

        {service.approveBookingBeforePayment && (
          <Typography variant="caption" sx={{ textAlign: "center", mt: 1 }}>
            No payment will be taken until the operator has approved your
            booking
          </Typography>
        )}
      </Box>

      {errorData?.errorMessage && (
        <div>
          <Typography variant="caption">{errorData.errorMessage}</Typography>
        </div>
      )}
    </form>
  );
};
