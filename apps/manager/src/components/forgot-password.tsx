import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useUserState } from "state/users";

export const ForgotPasswordForm: React.FC = () => {
  const { sendForgotPasswordEmail, sendForgotPasswordEmailStatus } =
    useUserState();

  const [email, setEmail] = React.useState("");

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
        {sendForgotPasswordEmailStatus === "success" && (
          <Typography>
            Thank you. You will receive a password reset email link shortly.
            Please follow the instructions on that email to reset your password.
          </Typography>
        )}

        {sendForgotPasswordEmailStatus !== "success" && (
          <>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Forgot password
            </Typography>

            <Typography>
              Enter your email address and we will send you a password reset
              link
            </Typography>

            <TextField
              placeholder="Email address"
              variant="standard"
              type="email"
              value={email}
              disabled={sendForgotPasswordEmailStatus === "fetching"}
              error={sendForgotPasswordEmailStatus === "error"}
              helperText={
                sendForgotPasswordEmailStatus === "error" &&
                "User with that email doesn't exist"
              }
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              disabled={email.trim() === ""}
              onClick={() => sendForgotPasswordEmail(email)}
            >
              {sendForgotPasswordEmailStatus === "fetching" ? (
                <CircularProgress size={20} />
              ) : (
                "Send password reset link"
              )}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};
