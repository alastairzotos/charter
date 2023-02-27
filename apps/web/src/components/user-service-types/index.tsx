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
import { ServiceSchemaDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { Titled } from "src/components/titled";

interface Props {
  serviceSchemas: ServiceSchemaDto[];
}

export const ServiceTypes: React.FC<Props> = ({ serviceSchemas }) => {
  return (
    <Titled title="Available services" center>
      <Grid container gap={2} sx={{ mt: 3 }} justifyContent="center">
        {serviceSchemas.map((schema) => (
          <Grid key={schema._id} item xs={12} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                title={schema.label}
                image={`/service-type-images/${schema.label}.jpeg`}
                sx={{ height: 180 }}
              />
              <CardHeader title={schema.pluralLabel} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {schema.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} href={urls.user.serviceType(schema)}>
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
