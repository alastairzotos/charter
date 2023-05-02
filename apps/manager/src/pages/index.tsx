import { useRouter } from "next/router";
import { useEffect } from "react";
import { urls } from "urls";

import { useUserState } from "state/users";
import { NextPage } from "next";
import { Typography } from "@mui/material";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { initialised, loggedInUser } = useUserState();

  useEffect(() => {
    if (initialised) {
      if (!loggedInUser) {
        router.push(urls.login());
      } else if (loggedInUser.role === "admin") {
        router.push(urls.admin.home());
      } else if (loggedInUser.role === "operator") {
        router.push(urls.operators.home());
      } else if (loggedInUser.role === "super-admin") {
        router.push(urls.superAdmin.home());
      }
    }
  }, [initialised, loggedInUser]);

  return (
    <>
      <Typography>
        If you are an operator, wait for the admin to register you.
      </Typography>
      <Typography>
        When they have, log out of this page and log back in and you will be
        able to manage your services.
      </Typography>
    </>
  );
};

HomePage.getInitialProps = () => ({});

export default HomePage;
