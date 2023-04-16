import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BookingDto } from "dtos";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { urls } from "urls";
import { getReadableBookingDetails } from "utils";

import { KeyValues } from "src/components/key-values";
import { DeleteConfirmModal } from "src/components/modals/delete-confirm";
import { Titled } from "src/components/titled";
import { useSetBookingStatus } from "src/state/bookings";
import { SETTINGS_WIDTH } from "src/util/misc";

interface Props {
  booking: BookingDto;
}

export const OperatorBookingSummary: React.FC<Props> = ({ booking }) => {
  const router = useRouter();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [setBookingStatusStatus, setBookingStatus] = useSetBookingStatus(
    (s) => [s.status, s.request]
  );

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

              <Button color="warning" onClick={() => setRejectModalOpen(true)}>
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
