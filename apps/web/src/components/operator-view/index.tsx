import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { OperatorDto } from "dtos";
import React, { useState } from "react";

interface Props {
  operator: OperatorDto;
}

interface InnerProps extends Props {
  showTitle: boolean;
}

const OperatorViewTitle: React.FC<Props> = ({ operator }) => (
  <Box sx={{ display: "flex" }}>
    <Avatar alt={operator.name + " logo"} src={operator.photo} sx={{ mr: 2 }} />

    <Typography variant="h5" sx={{ mt: 0.5 }}>
      {operator.name}
    </Typography>
  </Box>
);

const OperatorViewInner: React.FC<InnerProps> = ({ operator, showTitle }) => {
  return (
    <>
      {showTitle && <OperatorViewTitle operator={operator} />}

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
        <Typography variant="subtitle2">
          {operator.address.split("\n").join(", ")}
        </Typography>
      </Stack>

      <Box sx={{ mt: 4, ml: 1 }}>
        {operator.description.split("\n").map((line, index) => (
          <Typography key={index} variant="subtitle2">
            {line}
          </Typography>
        ))}
      </Box>
    </>
  );
};

export const OperatorViewMobile: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <OperatorViewTitle {...props} />
      </AccordionSummary>
      <AccordionDetails>
        <OperatorViewInner showTitle={false} {...props} />
      </AccordionDetails>
    </Accordion>
  );
};

export const OperatorView: React.FC<Props> = (props) => {
  return (
    <>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <OperatorViewMobile {...props} />
      </Box>

      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Paper sx={{ p: 3 }}>
          <OperatorViewInner showTitle {...props} />
        </Paper>
      </Box>
    </>
  );
};
