import { NextPage } from "next";
import React from "react";

import { OperatorBookings } from "src/components/operator-bookings";

const OperatorsAdminPage: NextPage = () => {
  return <OperatorBookings />;
};

OperatorsAdminPage.getInitialProps = () => ({});

export default OperatorsAdminPage;
