import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TabsProvider, TabsView } from "ui";
import { urls } from "urls";

import { OperatorBookingList } from "components/operator/bookings/operator-booking-list";
import { useLoadBookingsForUser } from "state/bookings";

const POLLING_INTERVAL = 5000;

export const OperatorBookings: React.FC = () => {
  const router = useRouter();

  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission | null>("default");

  const [getBookingsForUserStatus, getBookingsForUser, userBookings] =
    useLoadBookingsForUser((s) => [s.status, s.request, s.value]);

  const [seenPendingBookingIds, setSeenPendingBookingIds] = useState<string[]>(
    []
  );

  useEffect(() => {
    Notification.requestPermission((perm) => setNotificationPermission(perm));

    getBookingsForUser();
    const interval = setInterval(() => getBookingsForUser(), POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const pendingBookings = userBookings
    ? userBookings.filter(
        (booking) =>
          booking.status === "pending" &&
          booking.paymentStatus === "pending" &&
          booking.setupIntentStatus === "succeeded"
      )
    : undefined;

  const confirmedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "confirmed")
    : undefined;

  const rejectedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "rejected")
    : undefined;

  useEffect(() => {
    if (getBookingsForUserStatus === "success") {
      const unseenBookings = pendingBookings?.filter(
        (booking) => !seenPendingBookingIds.includes(booking._id)
      );

      if ((unseenBookings?.length || 0) > seenPendingBookingIds.length) {
        setSeenPendingBookingIds(
          unseenBookings?.map((booking) => booking._id) || []
        );

        if (notificationPermission === "granted") {
          unseenBookings?.forEach((unseenBooking) => {
            const notification = new Notification(
              `New booking for ${unseenBooking.service.name}`,
              {
                data: { id: unseenBooking._id },
                body: "Click to see details",
                requireInteraction: true,
                silent: false,
                vibrate: [100, 100, 100],
                icon: "https://charter.bitmetro.io/_next/image?url=%2Fbm-logo.png&w=96&q=75",
                badge:
                  "https://charter.bitmetro.io/_next/image?url=%2Fbm-logo.png&w=96&q=75",
                tag: unseenBooking._id,
              }
            );

            notification.addEventListener("click", (e) => {
              const id = (e.currentTarget as any).data.id as string;
              router.push(urls.operators.booking(id));
              notification.close();
            });
          });
        }
      }
    }
  }, [getBookingsForUserStatus]);

  return (
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
  );
};
