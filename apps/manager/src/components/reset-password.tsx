import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { useUserState } from "state/users";

export const ResetPasswordForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const [resetPasswordStatus, resetPassword] = useUserState((s) => [
    s.resetPasswordStatus,
    s.resetPassword,
  ]);

  React.useEffect(() => {
    if (resetPasswordStatus === "success") {
      router.push(urls.login());
    }
  }, [resetPasswordStatus]);

  const isValidPassword = newPassword.length >= 8;
  const isValid = email.trim().length > 0 && isValidPassword;

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
          Reset password
        </Typography>

        <TextField
          placeholder="Email address"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={resetPasswordStatus === "fetching"}
        />

        <TextField
          placeholder="Old Password"
          variant="standard"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={resetPasswordStatus === "fetching"}
          error={!isValidPassword}
        />

        <TextField
          placeholder="New Password"
          variant="standard"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={resetPasswordStatus === "fetching"}
          error={!isValidPassword}
          helperText={
            isValidPassword ? "" : "Passwords must be minimum 8 characters"
          }
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!isValid || resetPasswordStatus === "fetching"}
          onClick={() => resetPassword(email, oldPassword, newPassword)}
        >
          {resetPasswordStatus === "fetching" ? (
            <CircularProgress size={20} />
          ) : (
            "Reset password"
          )}
        </Button>
      </Box>
    </Paper>
  );
};
