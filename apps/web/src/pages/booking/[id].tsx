import { BookingDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getBookingWithOperatorAndService } from "clients/bookings.client";
import { SeoHead } from "components/seo/head";
import { UserBookingView } from "components/user-booking-view";
import { UserLayoutContainer } from "components/user-layout/container";

interface Props {
  booking: BookingDto;
}

const BookingPage: NextPage<Props> = ({ booking }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle="Your Booking"
        description={`Your booking for ${booking.service.name} by ${booking.operator.name}`}
      />

      <UserBookingView booking={booking} />
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    return {
      props: {
        booking: await getBookingWithOperatorAndService(id),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default BookingPage;
