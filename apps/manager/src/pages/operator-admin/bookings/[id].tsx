import { BookingDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { urls } from "urls";

import { getBookingById } from "clients/bookings.client";
import { Breadcrumbs } from "components/_core/breadcrumbs";
import { OperatorBooking } from "screens/operator/bookings/operator-booking";

interface Props {
  booking: BookingDto;
}

const OperatorBookingPage: NextPage<Props> = ({ booking }) => {
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

      <OperatorBooking booking={booking} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = params?.id as string;

  return {
    props: {
      booking: await getBookingById(id),
    },
  };
};

export default OperatorBookingPage;
