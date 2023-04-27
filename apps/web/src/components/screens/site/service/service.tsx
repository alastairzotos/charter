import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import { ServiceDto } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getReadablePricingStringsForService } from "utils";

import { KeyValues } from "components/lib/_core/key-values";
import { MultilineText } from "components/lib/site/_core/multiline-text";
import { OpeningTimesView } from "components/lib/site/_core/opening-times-view";
import { ReadMore } from "components/lib/site/_core/read-more";
import { BookingModal } from "components/lib/site/booking-form/booking-modal";
import { OperatorCardMobile } from "components/lib/site/operators/operator-card";
import { BookButton } from "components/lib/site/service/book-button";
import { ImageGallery } from "components/lib/site/service/image-gallery";
import { UserServiceViewContent } from "components/lib/site/service/user-service-view-content";
import { UserServiceViewFields } from "components/lib/site/service/user-service-view-fields";
import { BookingForm } from "components/screens/site/booking-form/booking-form";
import { useIsDesktop } from "hooks/use-is-desktop";

interface Props {
  bookingView?: boolean;
  service: ServiceDto;
}

export const UserServiceView: React.FC<Props> = ({
  bookingView = false,
  service,
}) => {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const schema = service.serviceSchema;
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const priceDetails = getReadablePricingStringsForService(service);

  useEffect(() => {
    if (!isDesktop && bookingModalOpen) {
      window.scrollTo(0, 0);
    }

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

      <OperatorCardMobile linkToOperatorPage operator={service.operator} />

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
            <>
              <BookButton onClick={() => setBookingModalOpen(true)} />
              {service.approveBookingBeforePayment && (
                <Typography
                  variant="subtitle2"
                  fontSize={12}
                  sx={{
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Payment won't be taken until the operator has approved your
                  booking
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <Modal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)}>
        <BookingModal>
          <BookingForm
            service={service}
            onClose={() => setBookingModalOpen(false)}
          />
        </BookingModal>
      </Modal>
    </Box>
  );
};
