import { BookingDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getBookingById } from "clients/bookings.client";
import { OperatorBooking } from "components/operator/bookings/operator-booking";

interface Props {
  booking: BookingDto;
}

const OperatorBookingPage: NextPage<Props> = ({ booking }) => {
  return <OperatorBooking booking={booking} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const bookingId = params?.bookingId as string;

  return {
    props: {
      booking: await getBookingById(bookingId),
    },
  };
};

export default OperatorBookingPage;
