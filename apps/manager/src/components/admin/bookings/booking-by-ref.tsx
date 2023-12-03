import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { BookingAnalyticsBookingDetails } from "components/admin/bookings/booking-analytics-booking-details";
import { useLoadBookingByRef } from "state/bookings";
import { SETTINGS_WIDTH } from "util/misc";

export const BookingByRef: React.FC = () => {
  const [bookingRef, setBookingRef] = useState("");

  const [getBookingStatus, getBooking, booking] = useLoadBookingByRef((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      getBooking(bookingRef);
    }
  };

  return (
    <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
        <TextField
          style={{ flex: 1 }}
          type="text"
          placeholder="Enter booking ref"
          value={bookingRef}
          onChange={(e) => setBookingRef(e.target.value)}
          onKeyUp={handleKeyUp}
          disabled={getBookingStatus === "fetching"}
        />

        <Button
          variant="contained"
          disabled={
            bookingRef.trim().length === 0 || getBookingStatus === "fetching"
          }
          onClick={() => getBooking(bookingRef)}
        >
          {getBookingStatus === "fetching" ? (
            <CircularProgress size={20} />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </Box>

      <Box sx={{ pt: 2 }}>
        {getBookingStatus === "error" && (
          <Typography>There was an unexpected error</Typography>
        )}
        {getBookingStatus === "success" && !booking && (
          <Typography>Cannot find booking</Typography>
        )}
        {getBookingStatus === "success" && !!booking && (
          <BookingAnalyticsBookingDetails booking={booking} />
        )}
      </Box>
    </Box>
  );
};
