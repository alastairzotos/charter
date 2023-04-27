import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { BookingAnalyticsBooking } from "components/screens/backend/screens/admin/screens/bookings/lib/booking-analytics-booking";
import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";

const OperatorBookingPage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.operatorId as string;
  const bookingId = router.query.bookingId as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.bookings(), title: "Bookings" },
          { href: urls.admin.operatorBookings(operatorId), title: "Operator" },
        ]}
        current="Booking"
      />

      <BookingAnalyticsBooking bookingId={bookingId} />
    </>
  );
};

OperatorBookingPage.getInitialProps = () => ({});

export default OperatorBookingPage;
