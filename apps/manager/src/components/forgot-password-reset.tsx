import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ResetPwdOtc } from "dtos";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { useUserState } from "state/users";

interface Props {
  otc: ResetPwdOtc;
}

export const ForgotPasswordResetForm: React.FC<Props> = ({ otc }) => {
  const router = useRouter();

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { resetForgottenPassword, resetForgottenPasswordStatus } =
    useUserState();

  React.useEffect(() => {
    if (resetForgottenPasswordStatus === "success") {
      router.push(urls.loginAfterPasswordReset());
    }
  }, [resetForgottenPasswordStatus]);

  const isValidPassword1 = newPassword.length >= 8;
  const isValidPassword2 = confirmPassword === newPassword;
  const isValid = isValidPassword1 && isValidPassword2;

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

        <Typography sx={{ textAlign: "center" }}>
          For {otc.user.email}
        </Typography>

        <TextField
          placeholder="New Password"
          variant="standard"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={resetForgottenPasswordStatus === "fetching"}
          error={!isValidPassword1}
          helperText={
            isValidPassword1 ? "" : "Passwords must be minimum 8 characters"
          }
        />

        <TextField
          placeholder="Confirm Password"
          variant="standard"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={resetForgottenPasswordStatus === "fetching"}
          error={!isValidPassword2}
          helperText={isValidPassword1 ? "" : "Passwords must match"}
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!isValid || resetForgottenPasswordStatus === "fetching"}
          onClick={() => resetForgottenPassword(otc._id, newPassword)}
        >
          {resetForgottenPasswordStatus === "fetching" ? (
            <CircularProgress size={20} />
          ) : (
            "Reset password"
          )}
        </Button>

        {resetForgottenPasswordStatus === "error" && (
          <Typography>There was an error</Typography>
        )}
      </Box>
    </Paper>
  );
};
