import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Modal, Typography } from "@mui/material";
import { OperatorDto, ServiceDto } from "dtos";
import Link from "next/link";
import React, { useState } from "react";
import { urls } from "urls";

import { BookingForm } from "src/components/booking-form";
import { ImageGallery } from "src/components/image-gallery";
import { KeyValue } from "src/components/key-value";
import { Titled } from "src/components/titled";

interface Props {
  bookingView?: boolean;
  service: ServiceDto;
  operator: OperatorDto;
}

export const UserServiceView: React.FC<Props> = ({
  bookingView = false,
  service,
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
          Back to services
        </Button>
      )}

      <Titled title={service.name}>
        <Typography sx={{ mt: 2, mb: 2 }}>{service.description}</Typography>

        {/* <KeyValue label="Start location" value={service.startLocation} />
        <KeyValue label="Start time" value={service.startTime} />
        <KeyValue label="Duration" value={service.duration} /> */}
        <KeyValue
          label="Adult Price"
          value={"€" + service.adultPrice.toFixed(2)}
        />
        <KeyValue
          label="Child Price"
          value={"€" + service.childPrice.toFixed(2)}
        />

        {!bookingView && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mb: 2 }}
              size="large"
              onClick={() => setBookingModalOpen(true)}
            >
              Book now
            </Button>
          </Box>
        )}

        {/* {service.photos && service.photos.length > 0 && (
          <ImageGallery items={service.photos} />
        )} */}
      </Titled>

      <Modal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)}>
        <BookingForm
          operator={operator}
          service={service}
          onClose={() => setBookingModalOpen(false)}
        />
      </Modal>
    </>
  );
};
