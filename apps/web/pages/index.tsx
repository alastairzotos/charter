import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { OperatorDto, ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { getOperators } from "src/clients/operators.client";
import { getServiceSchemaCategories } from "src/clients/service-schema-categories.client";
import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserOperatorsList } from "src/components/user-operators-list";
import { ServiceCategories } from "src/components/user-service-categories";
import { APP_NAME, capitalise } from "src/util/misc";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
  operators: OperatorDto[];
}

const Home: NextPage<Props> = ({ schemaCategories, operators }) => {
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
        <Titled title="Operators" center>
          <UserOperatorsList operators={operators} />
        </Titled>
      </UserLayoutContainer>

      <UserLayoutContainer>
        <Typography variant="h3" sx={{ mt: 4, textAlign: "center" }}>
          How it works
        </Typography>

        <Box sx={{ mt: 3, p: 6, display: "flex", justifyContent: "center" }}>
          <Stepper activeStep={3} orientation="vertical">
            <Step>
              <StepLabel>Find an operator near you</StepLabel>
            </Step>
            <Step>
              <StepLabel>Find a service that you like</StepLabel>
            </Step>
            <Step>
              <StepLabel>Book the service!</StepLabel>
            </Step>
          </Stepper>
        </Box>
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      schemaCategories: await getServiceSchemaCategories(),
      operators: await getOperators(),
    },
  };
};

export default Home;
