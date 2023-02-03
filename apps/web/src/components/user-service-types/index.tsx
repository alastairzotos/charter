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
import { getSchemaForServiceType } from "service-schemas";
import { urls } from "urls";

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
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {getSchemaForServiceType(serviceType)?.description || ""}
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
