import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserOperatorsList } from "src/components/user-operators-list";
import { OperatorsService } from "src/services/operators.service";
import { APP_NAME } from "src/util/misc";

interface Props {
  operators: OperatorDto[];
}

const Home: NextPage<Props> = ({ operators }) => {
  return (
    <>
      <SeoHead
        subtitle="Book boat trips, sun beds, and others in Corfu"
        description="Easily book boat trips, sun beds, and other services in Corfu"
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
            src="/logo.png"
            alt={`${APP_NAME} logo`}
            width={200}
            height={200}
          />

          <Typography variant="h3">The best way to explore Corfu</Typography>
          <Typography variant="h5" sx={{ pt: 1 }}>
            Easily book boat trips, sun beds, and other services for you and your family
          </Typography>
        </Box>
      </Box>

      <UserLayoutContainer>
        <Titled title="Tour operators">
          <UserOperatorsList operators={operators} />
        </Titled>
      </UserLayoutContainer>

      <UserLayoutContainer alternative>
        <Typography variant="h3" sx={{ mt: 4, textAlign: "center" }}>
          How it works
        </Typography>

        <Box sx={{ mt: 3, p: 6, display: "flex", justifyContent: "center" }}>
          <Stepper activeStep={3} orientation="vertical">
            <Step>
              <StepLabel>Find an operator near you</StepLabel>
            </Step>
            <Step>
              <StepLabel>Find a boat trip, sun bed, or other service that you like</StepLabel>
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
  const svc = new OperatorsService();

  return {
    props: {
      operators: await svc.getOperators(),
    },
  };
};

export default Home;
