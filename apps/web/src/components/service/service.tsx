import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Grid, Modal, Paper, Typography } from "@mui/material";
import { ServiceDto } from "dtos";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { KeyValues, useIsDesktop } from "ui";
import { urls } from "urls";
import { getReadablePricingStringsForService } from "utils";

import { ClosedMessage } from "components/_core/closed-message";
import { MultilineText } from "components/_core/multiline-text";
import { OpeningTimesView } from "components/_core/opening-times-view";
import { ReadMore } from "components/_core/read-more";
import { BookingForm } from "components/booking-form/booking-form";
import { BookingModal } from "components/booking-form/booking-modal";
import { OperatorCardMobile } from "components/operators/operator-card";
import { BookButton } from "components/service/book-button";
import { ImageGallery } from "components/service/image-gallery";
import { UserServiceViewContent } from "components/service/user-service-view-content";
import { UserServiceViewFields } from "components/service/user-service-view-fields";
import { IS_CLOSED_FOR_WINTER } from "util/misc";

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

      {/* <OperatorCardMobile linkToOperatorPage operator={service.operator} /> */}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ReadMore>
              <MultilineText content={service.description} />
            </ReadMore>
          </Paper>

          <UserServiceViewContent service={service} />

          <Button
            component={Link}
            href={urls.user.cancellation()}
            target="_blank"
            sx={{ mt: 2 }}
            size="small"
          >
            Cancellation Policy <OpenInNewIcon sx={{ fontSize: 14, ml: 1 }} />
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            {service.photos && service.photos.length > 0 ? (
              <ImageGallery items={service.photos} />
            ) : service.serviceSchema.schemaCategory &&
              service.serviceSchema.schemaCategory.photo ? (
              <ImageGallery
                items={[service.serviceSchema.schemaCategory.photo]}
              />
            ) : null}

            <Box sx={{ p: 1 }}>
              <KeyValues kv={priceDetails} />
              <UserServiceViewFields
                data={service.data}
                fields={schema.fields}
              />
              <OpeningTimesView openingTimes={service.openingTimes} />
            </Box>
          </Paper>

          {!bookingView && !IS_CLOSED_FOR_WINTER && (
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

          <Box sx={{ p: 3 }}>
            <Typography>
              <ClosedMessage />
            </Typography>
          </Box>
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
