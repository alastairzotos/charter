import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorBooking } from "src/components/operator-booking";

const OperatorBookingPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.operators.home(), title: "Operator" },
          { href: urls.operators.bookings(), title: "Bookings" },
        ]}
        current="Booking"
      />

      <OperatorBooking id={id} />
    </>
  );
};

OperatorBookingPage.getInitialProps = () => ({});

export default OperatorBookingPage;
