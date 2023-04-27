import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { TabsProvider, TabsView } from "components/lib/_core/tabs";
import { OperatorBookingList } from "components/lib/backend/operator/bookings/operator-booking-list";
import { useLoadBookingsForUser } from "state/bookings";

export const OperatorBookings: React.FC = () => {
  const [getBookingsForUserStatus, getBookingsForUser, userBookings] =
    useLoadBookingsForUser((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!userBookings) {
      getBookingsForUser();
    }
  }, [userBookings]);

  const pendingBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "pending")
    : undefined;

  const confirmedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "confirmed")
    : undefined;

  const rejectedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "rejected")
    : undefined;

  return (
    <StatusSwitch
      status={getBookingsForUserStatus}
      error={
        <Typography>
          There was an error loading the bookings. Please try again later.
        </Typography>
      }
    >
      <TabsProvider
        tabs={[
          {
            label: "Pending bookings",
            content: <OperatorBookingList bookings={pendingBookings} />,
          },
          {
            label: "Confirmed bookings",
            content: <OperatorBookingList bookings={confirmedBookings} />,
          },
          {
            label: "Rejected bookings",
            content: <OperatorBookingList bookings={rejectedBookings} />,
          },
        ]}
      >
        <TabsView />
      </TabsProvider>
    </StatusSwitch>
  );
};
