import { NextPage } from "next";
import React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { OperatorBookings } from "components/screens/backend/screens/operator/screens/bookings/screens/operator-bookings";

const OperatorsBookingPage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.operators.home(), title: "Operator" },
        ]}
        current="Bookings"
      />

      <OperatorBookings />
    </>
  );
};

OperatorsBookingPage.getInitialProps = () => ({});

export default OperatorsBookingPage;
