import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { OperatorDto } from "dtos";
import React from "react";

interface Props {
  operator: OperatorDto;
}

export const OperatorView: React.FC<Props> = ({ operator }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Avatar
          alt={operator.name + " logo"}
          src={operator.photo}
          sx={{ mr: 2 }}
        />

        <Typography variant="h5" sx={{ mt: 0.5 }}>
          {operator.name}
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, ml: 1 }}>
        <EmailIcon />
        <Typography variant="subtitle2">{operator.email}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, ml: 1 }}>
        <PhoneIcon />
        <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, ml: 1 }}>
        <HomeIcon />
        <Typography variant="subtitle2">{operator.address}</Typography>
      </Stack>

      <Box sx={{ mt: 4, ml: 1 }}>
        <Typography variant="subtitle2">{operator.description}</Typography>
      </Box>
    </>
  );
};
