import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getServiceTypeLabel, serviceTypes } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { ServiceTypeDescription } from "src/components/service-type-description";
import { ServiceTypeIcon } from "src/components/service-type-icon";
import { Titled } from "src/components/titled";
import { pluralize } from "src/util/misc";

export const ServiceTypes: React.FC = () => {
  return (
    <Titled title="Available services" center>
      <Grid container gap={2} sx={{ mt: 3 }} justifyContent="center">
        {serviceTypes
          .filter((type) => type !== "none")
          .map((serviceType) => (
            <Grid key={serviceType} item xs={12} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  title={serviceType}
                  image={`/service-type-images/${serviceType}.jpeg`}
                  sx={{ height: 180 }}
                />
                <CardHeader
                  title={pluralize(2, getServiceTypeLabel(serviceType))}
                  avatar={<ServiceTypeIcon serviceType={serviceType} />}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <ServiceTypeDescription serviceType={serviceType} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    href={urls.user.serviceType(serviceType)}
                  >
                    Browse
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Titled>
  );
};
