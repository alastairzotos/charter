import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ServiceSchemaCategoryDto } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { Titled } from "ui";
import { urls } from "urls";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
}

export const ServiceCategories: React.FC<Props> = ({ schemaCategories }) => {
  const router = useRouter();

  return (
    <Titled title="Available services" center>
      <Grid container gap={2} sx={{ mt: 3 }} justifyContent="center">
        {schemaCategories.map((category) => (
          <Grid key={category._id} item xs={12} md={3}>
            <Card
              onClick={() => router.push(urls.user.serviceCategory(category))}
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
          </Grid>
        ))}
      </Grid>
    </Titled>
  );
};
