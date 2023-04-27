import DoneIcon from "@mui/icons-material/Done";
import {
  Alert,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { BookingDto } from "dtos";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Titled, KeyValues } from "ui";
import { urls } from "urls";
import { getReadableBookingDetails } from "utils";

import { DeleteConfirmModal } from "components/lib/backend/_core/delete-confirm-modal";
import { useSetBookingFulfillment, useSetBookingStatus } from "state/bookings";
import { SETTINGS_WIDTH } from "util/misc";

interface Props {
  booking: BookingDto;
}

export const OperatorBookingSummary: React.FC<Props> = ({ booking }) => {
  const router = useRouter();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [setBookingStatusStatus, setBookingStatus] = useSetBookingStatus(
    (s) => [s.status, s.request]
  );

  const [setBookingFulfillmentStatus, setBookingFulfillment] =
    useSetBookingFulfillment((s) => [s.status, s.request]);

  const rejectBooking = async () => {
    await setBookingStatus(booking._id, "rejected");
    router.push(urls.operators.bookings());
  };

  const confirmBooking = async () => {
    await setBookingStatus(booking._id, "confirmed");
    router.push(urls.operators.bookings());
  };

  return (
    <Titled title={booking.service.name}>
      <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
        {booking.fulfilled && (
          <Alert sx={{ width: SETTINGS_WIDTH, mb: 2 }} severity="info">
            This booking has been fulfilled
          </Alert>
        )}

        <KeyValues
          sx={{ maxWidth: SETTINGS_WIDTH }}
          kv={getReadableBookingDetails(booking)}
        />

        <Box sx={{ mt: 3 }}>
          {booking.status === "confirmed" && (
            <Typography>This booking has been confirmed</Typography>
          )}
          {booking.status === "rejected" && (
            <Typography>You have rejected this booking</Typography>
          )}
          {booking.status === "pending" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={confirmBooking}
                >
                  {setBookingStatusStatus === "fetching" ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Confirm"
                  )}
                </Button>

                <Button
                  color="warning"
                  onClick={() => setRejectModalOpen(true)}
                >
                  Reject
                </Button>
              </Box>

              {setBookingStatusStatus === "error" && (
                <Typography>
                  There was an error. Please try again later.
                </Typography>
              )}
            </>
          )}

          {!booking.fulfilled && (
            <Tooltip title="By fulfilling the booking you can be notified if the customer tries to use their QR code more than once">
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => setBookingFulfillment(booking._id, true)}
                disabled={
                  setBookingFulfillmentStatus === "fetching" ||
                  setBookingFulfillmentStatus === "success"
                }
              >
                {!setBookingFulfillmentStatus && "Fulfill booking"}
                {setBookingFulfillmentStatus === "fetching" && (
                  <CircularProgress size={20} />
                )}
                {setBookingFulfillmentStatus === "success" && <DoneIcon />}
                {setBookingFulfillmentStatus === "error" &&
                  "There was an error. Please try again"}
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>

      <DeleteConfirmModal
        title="Reject booking?"
        content="Are you sure you want to reject this booking? This can't be undone"
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        deleteStatus={setBookingStatusStatus}
        onDelete={rejectBooking}
      />
    </Titled>
  );
};
