import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { urls } from "urls";

import {
  fetchFbUserInfo,
  fetchGoogleUserInfo,
} from "src/clients/oauth2.client";
import { GoogleLoginButton } from "src/components/google-login-button";
import { useOAuthLogin } from "src/state/oauth2";
import { useUserState } from "src/state/users";
import { getEnv } from "src/util/env";

const LoginFormInner: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginStatus: basicLoginStatus, login: basicLogin } = useUserState();

  const { status: oauthLoginStatus, request: loginOAuth } = useOAuthLogin();

  useEffect(() => {
    if (basicLoginStatus === "success") {
      router.push(urls.home());
    }
  }, [basicLoginStatus]);

  const handleEmailPasswordLogin = async () => {
    await basicLogin(email, password);
    router.push(urls.home());
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (response) => {
      fetchGoogleUserInfo(response.access_token)
        .then(loginOAuth)
        .then(() => router.push(urls.home()));
    },
  });

  const handleFacebookLogin = (response: ReactFacebookLoginInfo) => {
    fetchFbUserInfo(response.accessToken)
      .then(loginOAuth)
      .then(() => router.push(urls.home()));
  };

  const isLoggingIn =
    basicLoginStatus === "fetching" || oauthLoginStatus === "fetching";

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Login
        </Typography>

        <GoogleLoginButton
          disabled={isLoggingIn}
          onClick={() => handleGoogleLogin()}
        />
        <FacebookLogin
          size="small"
          buttonStyle={{ width: "100%" }}
          appId={getEnv().fbAppId}
          fields="name,email,first_name"
          callback={handleFacebookLogin}
          icon="fa-facebook"
          isDisabled={isLoggingIn}
        />

        <Divider variant="middle" sx={{ pt: 2, pb: 2 }} />

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Login with email and password
        </Typography>

        <TextField
          placeholder="Email address"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />

        <TextField
          placeholder="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={isLoggingIn}
          onClick={handleEmailPasswordLogin}
        >
          {isLoggingIn ? <CircularProgress size={20} /> : "Login"}
        </Button>

        {basicLoginStatus === "error" && (
          <Typography>
            There was an error logging you in. Please ensure you have the
            correct email and password
          </Typography>
        )}

        <Typography color="GrayText">
          <Link href={urls.register()} style={{ textDecoration: "none" }}>
            Register
          </Link>{" "}
          an account
        </Typography>
      </Box>
    </Paper>
  );
};

export const LoginForm: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={getEnv().googleClientId}>
      <LoginFormInner />
    </GoogleOAuthProvider>
  );
};
