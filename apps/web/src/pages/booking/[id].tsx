import { BookingDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getBookingWithOperatorAndService } from "clients/bookings.client";
import { SeoHead } from "components/_core/seo-head";
import { UserLayoutContainer } from "components/_core/user-layout-container";
import { UserBookingView } from "screens/booking";

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
