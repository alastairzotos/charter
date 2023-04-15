import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import { OperatorDto, ServiceDto } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getReadablePricingStringsForService } from "utils";

import { BookButton } from "src/components/book-button";
import { BookingForm } from "src/components/booking-form";
import { BookingModal } from "src/components/booking-modal";
import { ImageGallery } from "src/components/image-gallery";
import { KeyValues } from "src/components/key-values";
import { MultilineText } from "src/components/multiline-text";
import { OpeningTimesView } from "src/components/opening-times";
import { OperatorViewMobile } from "src/components/operator-view";
import { ReadMore } from "src/components/read-more";
import { UserServiceViewContent } from "src/components/user-service-view-content";
import { UserServiceViewFields } from "src/components/user-service-view-fields";
import { useIsDesktop } from "src/hooks/use-is-desktop";

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
  const isDesktop = useIsDesktop();

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

  if (!isDesktop && bookingModalOpen) {
    return (
      <Paper sx={{ p: 4, m: -1 }}>
        <BookingForm
          operator={operator}
          service={service}
          onClose={() => setBookingModalOpen(false)}
        />
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {service.name}
      </Typography>

      <OperatorViewMobile linkToOperatorPage operator={operator} />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ReadMore>
              <MultilineText content={service.description} />
            </ReadMore>
          </Paper>

          <UserServiceViewContent service={service} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            {service.photos && service.photos.length > 0 && (
              <ImageGallery items={service.photos} />
            )}

            <Box sx={{ p: 1 }}>
              <KeyValues kv={priceDetails} />
              <UserServiceViewFields
                data={service.data}
                fields={schema.fields}
              />
              <OpeningTimesView openingTimes={service.openingTimes} />
            </Box>
          </Paper>

          {!bookingView && (
            <BookButton onClick={() => setBookingModalOpen(true)} />
          )}
        </Grid>
      </Grid>

      <Modal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)}>
        <BookingModal>
          <BookingForm
            operator={operator}
            service={service}
            onClose={() => setBookingModalOpen(false)}
          />
        </BookingModal>
      </Modal>
    </Box>
  );
};
