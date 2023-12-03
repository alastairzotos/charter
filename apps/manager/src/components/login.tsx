import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { urls } from "urls";

import { loginWithFacebook, loginWithGoogle } from "clients/oauth2.client";
import { LoginButton } from "components/_core/login-button";
import { useConfiguration } from "contexts/configuration";
import { useOAuthLogin } from "state/oauth2";
import { useUserState } from "state/users";
import { getEnv } from "util/env";

interface Props {
  includeSocials?: boolean;
}

const LoginFormInner: React.FC<Props> = ({ includeSocials = true }) => {
  const router = useRouter();
  const { googleLogin, facebookLogin } = useConfiguration();

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
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (response) => {
      loginWithGoogle(response.access_token)
        .then(loginOAuth)
        .then(() => router.push(urls.home()));
    },
  });

  const handleFacebookLogin = (response: ReactFacebookLoginInfo) => {
    loginWithFacebook(response.accessToken)
      .then(loginOAuth)
      .then(() => router.push(urls.home()));
  };

  const isLoggingIn =
    basicLoginStatus === "fetching" || oauthLoginStatus === "fetching";

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {googleLogin && includeSocials && (
          <LoginButton
            disabled={isLoggingIn}
            onClick={() => handleGoogleLogin()}
            startIcon={<GoogleIcon />}
          >
            Login with Google
          </LoginButton>
        )}

        {facebookLogin && includeSocials && (
          <FacebookLogin
            size="small"
            buttonStyle={{ width: "100%" }}
            appId={getEnv().fbAppId}
            fields="name,email,first_name"
            callback={handleFacebookLogin}
            icon="fa-facebook"
            isDisabled={isLoggingIn}
            render={(props) => (
              <LoginButton {...props} startIcon={<FacebookRoundedIcon />}>
                Login with Facebook
              </LoginButton>
            )}
          />
        )}

        {includeSocials && (googleLogin || facebookLogin) && (
          <>
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
              Or with email and password
            </Typography>
          </>
        )}

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

        <Typography color="GrayText">
          <Link href={urls.forgotPassword()} style={{ textDecoration: "none" }}>
            Forgot your password?
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export const LoginForm: React.FC<Props> = (props) => {
  const googleClientIdFromEnv = getEnv().googleClientId;

  const [googleClientId, setGoogleClientId] = useState<string | null>(
    googleClientIdFromEnv
  );

  useEffect(() => {
    if (!!googleClientIdFromEnv) {
      setGoogleClientId(googleClientIdFromEnv);
    }
  }, [googleClientIdFromEnv]);

  if (!googleClientId) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={getEnv().googleClientId}>
      <LoginFormInner {...props} />
    </GoogleOAuthProvider>
  );
};
