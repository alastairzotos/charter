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
import { ServiceSchemaCategoryDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { Titled } from "src/components/titled";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
}

export const ServiceCategories: React.FC<Props> = ({ schemaCategories }) => {
  return (
    <Titled title="Available services" center>
      <Grid container gap={2} sx={{ mt: 3 }} justifyContent="center">
        {schemaCategories.map((category) => (
          <Grid key={category._id} item xs={12} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                title={category.name}
                // image={`/service-type-images/${category.label}.jpeg`}
                image={category.photo}
                sx={{ height: 180 }}
              />
              <CardHeader title={category.pluralName} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  href={urls.user.serviceCategory(category)}
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
