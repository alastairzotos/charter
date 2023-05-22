import { NextPage } from "next";
import * as React from "react";

import { BookingAnalyticsTabs } from "components/admin/bookings/booking-analytics-tabs";

const BookingsPage: NextPage = () => {
  return <BookingAnalyticsTabs />;
};

BookingsPage.getInitialProps = () => ({});

export default BookingsPage;
