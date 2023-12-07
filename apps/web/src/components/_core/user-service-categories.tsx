import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ServiceSchemaCategoryDto } from "dtos";
import Link from "next/link";
import React from "react";
import { Titled } from "ui";
import { urls } from "urls";

interface Props {
  title?: string;
  schemaCategories: ServiceSchemaCategoryDto[];
}

export const ServiceCategories: React.FC<Props> = ({
  title = "Available services",
  schemaCategories,
}) => {
  return (
    <Titled title={title} center>
      <Grid container gap={2} sx={{ mt: 3 }} justifyContent="center">
        {schemaCategories.map((category) => (
          <Grid key={category._id} item xs={12} md={3}>
            <Link
              href={urls.user.serviceCategory(category)}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
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
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Titled>
  );
};
