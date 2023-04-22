import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceDto, ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { getServiceSchemaCategories } from "clients/service-schema-categories.client";
import { getPopularServices } from "clients/services.client";
import { PopularServices } from "components/popular-services";
import { SeoHead } from "components/seo/head";
import { UserLayoutContainer } from "components/user-layout/container";
import { ServiceCategories } from "components/user-service-categories";
import { APP_NAME, capitalise } from "util/misc";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
  popularServices: ServiceDto[];
}

const Home: NextPage<Props> = ({ schemaCategories, popularServices }) => {
  const serviceList = capitalise(
    schemaCategories
      .map((category) => category.pluralName.toLocaleLowerCase())
      .join(", ")
  );

  return (
    <>
      <SeoHead
        subtitle={`${serviceList}, and other services in Corfu`}
        description={`Easily book ${serviceList}, and other services in Corfu`}
      />

      <Box
        sx={{
          background: " linear-gradient(to right, #003366, #00aaff)",
          backgroundBlendMode: "color",
          backgroundSize: "cover",
          backgroundPosition: "middle",
          width: "100%",
          minHeight: 300,
          pt: 6,
          pb: 14,
          color: "white",
        }}
      >
        <Box
          sx={{
            ml: 6,
            mr: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Image
            src="/booking-logo.jpg"
            alt={`${APP_NAME} logo`}
            width={200}
            height={200}
          />

          <Typography variant="h3" sx={{ pt: 3 }}>
            The best way to enjoy Corfu
          </Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            Easily book trips, tours, activities, restaurants and other services
            for you and your family
          </Typography>
        </Box>
      </Box>

      <UserLayoutContainer>
        <ServiceCategories schemaCategories={schemaCategories} />
      </UserLayoutContainer>

      <UserLayoutContainer alternative>
        <PopularServices services={popularServices} />
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      schemaCategories: await getServiceSchemaCategories(),
      popularServices: await getPopularServices(),
    },
  };
};

export default Home;
