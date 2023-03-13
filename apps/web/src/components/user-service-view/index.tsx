import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Modal } from "@mui/material";
import { OperatorDto, ServiceDto } from "dtos";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { urls } from "urls";
import { getReadablePricingStringsForService } from "utils";

import { BookingForm } from "src/components/booking-form";
import { ImageGallery } from "src/components/image-gallery";
import { KeyValues } from "src/components/key-values";
import { Titled } from "src/components/titled";
import { UserServiceViewContent } from "src/components/user-service-view-content";
import { UserServiceViewFields } from "src/components/user-service-view-fields";

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
  const router = useRouter();

  const schema = service.serviceSchema;
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const priceDetails = getReadablePricingStringsForService(service);

  useEffect(() => {
    router.beforePopState(() => {
      if (bookingModalOpen) {
        window.history.pushState(null, "", router.asPath);
        setBookingModalOpen(false);
        return false;
      }

      return true;
    });

    return () => router.beforePopState(() => true);
  }, [router, bookingModalOpen]);

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
        <UserServiceViewContent service={service} />

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

        <KeyValues sx={{ maxWidth: 600 }} kv={priceDetails} />
        <UserServiceViewFields data={service.data} fields={schema.fields} />

        {service.photos && service.photos.length > 0 && (
          <ImageGallery items={service.photos} />
        )}
      </Titled>

      <Modal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)}>
        <div>
          <BookingForm
            operator={operator}
            service={service}
            onClose={() => setBookingModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};
