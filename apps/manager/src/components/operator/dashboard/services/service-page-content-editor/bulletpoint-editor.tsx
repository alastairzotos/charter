import CloseIcon from "@mui/icons-material/Close";
import { Button, FormLabel, IconButton, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  bullets: string[];
  onChange: (bullets: string[]) => void;
}

export const ServiceContentBulletpointEditor: React.FC<Props> = ({
  title,
  bullets,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>{title}</FormLabel>

      <Box>
        {bullets.map((bullet, index) => (
          <Box key={index} sx={{ display: "flex", pt: 1 }}>
            <TextField
              sx={{ width: 350 }}
              size="small"
              value={bullet}
              onChange={(e) =>
                onChange(
                  bullets.map((_, i) =>
                    i === index ? e.target.value : bullets[i]
                  )
                )
              }
            />

            <IconButton
              onClick={() => onChange(bullets.filter((_, i) => i !== index))}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button onClick={() => onChange([...bullets, ""])}>
        Add bullet point
      </Button>
    </Paper>
  );
};
