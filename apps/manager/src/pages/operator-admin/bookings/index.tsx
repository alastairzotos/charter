import { NextPage } from "next";
import React from "react";

import { OperatorBookings } from "components/operator/bookings/operator-bookings";

const OperatorsBookingPage: NextPage = () => {
  return <OperatorBookings />;
};

OperatorsBookingPage.getInitialProps = () => ({});

export default OperatorsBookingPage;
