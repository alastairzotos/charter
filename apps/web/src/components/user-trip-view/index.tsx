import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Modal, Typography } from "@mui/material";
import { OperatorDto, TripDto } from "dtos";
import Link from "next/link";
import React, { useState } from "react";
import { urls } from "urls";

import { BookingForm } from "src/components/booking-form";
import { KeyValue } from "src/components/key-value";
import { Titled } from "src/components/titled";
import { ImageGallery } from "src/components/image-gallery";

interface Props {
  bookingView?: boolean;
  trip: TripDto;
  operator: OperatorDto;
}

export const UserTripView: React.FC<Props> = ({
  bookingView = false,
  trip,
  operator,
}) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      {!bookingView && (
        <Button
          component={Link}
          href={urls.user.operator(operator)}
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon />
          Back to trips
        </Button>
      )}

      <Titled title={trip.name}>
        <Typography sx={{ mt: 2, mb: 2 }}>{trip.description}</Typography>

        <KeyValue label="Start location" value={trip.startLocation} />
        <KeyValue label="Start time" value={trip.startTime} />
        <KeyValue label="Duration" value={trip.duration} />
        <KeyValue
          label="Adult Price"
          value={"€" + trip.adultPrice.toFixed(2)}
        />
        <KeyValue
          label="Child Price"
          value={"€" + trip.childPrice.toFixed(2)}
        />

        {!bookingView && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mb: 2 }}
              onClick={() => setBookingModalOpen(true)}
            >
              Book now
            </Button>
          </Box>
        )}

        {trip.photos && trip.photos.length > 0 && (
          <ImageGallery items={trip.photos} />
        )}
      </Titled>

      <Modal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)}>
        <BookingForm
          operator={operator}
          trip={trip}
          onClose={() => setBookingModalOpen(false)}
        />
      </Modal>
    </>
  );
};
