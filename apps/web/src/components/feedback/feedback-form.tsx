import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useAddFeedback } from "state/feedback";

export const FeedbackForm: React.FC = () => {
  const [addFeedbackStatus, addFeedback] = useAddFeedback((s) => [
    s.status,
    s.request,
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleAddClick = () => addFeedback({ name, email, text });

  const isValid = name.length > 3 && email.length > 6 && text.length > 10;

  if (addFeedbackStatus === "success") {
    return (
      <>
        <Typography variant="h3">Thank you</Typography>

        <Typography>
          We are going to look into your issue and get back to you as quickly as
          possible. Thank you for your feedback.
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h3">Got a problem? Let us know</Typography>

      <TextField
        label="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={addFeedbackStatus === "fetching"}
      />

      <TextField
        label="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={addFeedbackStatus === "fetching"}
      />

      <TextField
        label="Description"
        placeholder="Describe your issue here in as must detail as you can and we shall get back to you"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={5}
        disabled={addFeedbackStatus === "fetching"}
      />

      <Button
        disabled={!isValid || addFeedbackStatus === "fetching"}
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        size="large"
      >
        Submit
      </Button>

      {addFeedbackStatus === "error" && (
        <Typography>
          There was an unexpected error. We are working on fixing it. Please try
          again later.
        </Typography>
      )}
    </Box>
  );
};
