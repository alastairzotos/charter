import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { BookingAnalytics } from "components/admin/bookings/booking-analytics";

const OperatorBookingsPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.operatorId as string;

  return <BookingAnalytics operatorId={id} />;
};

OperatorBookingsPage.getInitialProps = () => ({});

export default OperatorBookingsPage;
