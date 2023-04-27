import { NextPage } from "next";
import React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/_core/breadcrumbs";
import { OperatorBookings } from "screens/operator/bookings/operator-bookings";

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
