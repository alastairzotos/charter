import { Box, Typography } from "@mui/material";
import { BookingDto, OperatorDto, TripDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import { OperatorLayout } from "../../src/components/operator-layout";
import { OperatorView } from "../../src/components/operator-view";
import { SeoHead } from "../../src/components/seo/head";
import { UserBookingView } from "../../src/components/user-booking-view";
import { UserTripView } from "../../src/components/user-trip-view";
import { BookingsService } from "../../src/services/bookings.service";

interface Props {
  booking: BookingDto;
}

const BookingPage: NextPage<Props> = ({ booking }) => {
  return (
    <>
      <SeoHead subtitle="Your Booking" description={`Your booking for ${booking.trip.name} by ${booking.operator.name}`} />

      <UserBookingView booking={booking} />

      <Box sx={{ mt: 3 }}>
        <OperatorLayout operator={booking.operator}>
          <UserTripView bookingView operator={booking.operator} trip={booking.trip} />
        </OperatorLayout>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true
    }
  }

  const bookingsService = new BookingsService();

  try {
    return {
      props: {
        booking: await bookingsService.getBookingWithOperatorAndTrip(id)
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default BookingPage;