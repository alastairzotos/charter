import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { useUserState } from "src/state/user";

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const [registerStatus, registerUser] = useUserState((s) => [
    s.registerStatus,
    s.registerUser,
  ]);

  React.useEffect(() => {
    if (registerStatus === "success") {
      router.push(urls.login());
    }
  }, [registerStatus]);

  const isValidPassword = password.length >= 8;
  const passwordsMatch = password === password2;
  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    isValidPassword &&
    passwordsMatch;

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
          Register
        </Typography>

        <TextField
          placeholder="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={registerStatus === "fetching"}
        />

        <TextField
          placeholder="Email address"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={registerStatus === "fetching"}
        />

        <TextField
          placeholder="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerStatus === "fetching"}
          error={!isValidPassword}
          helperText={
            isValidPassword ? "" : "Password must be 8 characters or longer"
          }
        />

        <TextField
          placeholder="Repeat password"
          variant="standard"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          disabled={registerStatus === "fetching"}
          error={!passwordsMatch}
          helperText={passwordsMatch ? "" : "Passwords must match"}
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!isValid || registerStatus === "fetching"}
          onClick={() => registerUser(name, email, password)}
        >
          {registerStatus === "fetching" ? (
            <CircularProgress size={20} />
          ) : (
            "Register"
          )}
        </Button>
      </Box>
    </Paper>
  );
};
