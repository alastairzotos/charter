import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceDto, ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { getServiceSchemaCategories } from "clients/service-schema-categories.client";
import { ClosedMessage } from "components/_core/closed-message";
import { SeoHead } from "components/_core/seo-head";
import { UserLayoutContainer } from "components/_core/user-layout-container";
import { ServiceCategories } from "components/_core/user-service-categories";
import { APP_NAME, capitalise } from "util/misc";
import { AiSearch } from "components/_core/ai/ai-search";
import { useState } from "react";
import { UserServicesView } from "components/_core/user-services-view";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
}

const Home: NextPage<Props> = ({ schemaCategories }) => {
  const [searchResults, setSearchResults] = useState<ServiceDto[] | null>(null);

  const serviceList = capitalise(
    schemaCategories
      .map((category) => category.pluralName.toLocaleLowerCase())
      .join(", ")
  );

  return (
    <>
      <SeoHead
        subtitle={`${serviceList}, and other services in Corfu`}
        description={`Book ${serviceList}, and other services in Corfu`}
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
            Enjoy Corfu Effortlessly
          </Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            Book trips, tours, activities, restaurants and other services for
            you and your family
          </Typography>
        </Box>
      </Box>

      <UserLayoutContainer>
        <Box sx={{ p: 3, pb: 3, mx: { sx: 0, md: 6, xl: 20 } }}>
          <Typography variant="h6">
            <ClosedMessage />
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            pb: 6,
            mx: { sx: 0, md: 6, xl: 20 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <AiSearch onResultsUpdated={setSearchResults} />

          {searchResults &&
            (searchResults.length === 0 ? (
              <Typography>Sorry, no results found for your search</Typography>
            ) : (
              <>
                <Typography variant="h6">
                  These services might be of interest to you:
                </Typography>
                <UserServicesView services={searchResults} />
              </>
            ))}
        </Box>

        {!searchResults && (
          <ServiceCategories schemaCategories={schemaCategories} />
        )}
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      schemaCategories: await getServiceSchemaCategories(),
    },
  };
};

export default Home;
