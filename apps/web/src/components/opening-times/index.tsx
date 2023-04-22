import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  Day,
  defaultOpeningDayTime,
  defaultOpeningTimes,
  OpeningTimesDto,
} from "dtos";
import React, { useState } from "react";

import { KeyValues } from "components/key-values";
import { formatTime } from "util/misc";

interface Props {
  openingTimes: OpeningTimesDto;
}

export const OpeningTimesView: React.FC<Props> = ({
  openingTimes = defaultOpeningTimes,
}) => {
  const [openingTimesExpanded, setOpeningTimesExpanded] = useState(false);

  return (
    <Accordion
      elevation={0}
      sx={{
        width: "100%",
        mt: 1,
        "&::before": {
          backgroundColor: "transparent",
        },
      }}
      expanded={openingTimesExpanded}
      onChange={() => setOpeningTimesExpanded(!openingTimesExpanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="flex-start" gap={1} sx={{ ml: -1 }}>
          <AccessTimeIcon />
          <Typography>Opening times</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <KeyValues
          kv={Object.entries(openingTimes)
            .map(([day, openingHours]) => ({
              day,
              openingHours: openingHours.closed
                ? "Closed"
                : openingHours.allDay
                ? "All day"
                : `${formatTime(
                    openingHours.openingTime ||
                      defaultOpeningDayTime.openingTime!
                  )} to ${formatTime(
                    openingHours.closingTime ||
                      defaultOpeningDayTime.closingTime!
                  )}`,
            }))
            .reduce<Record<Day, string>>(
              (acc, { day, openingHours }) => ({
                ...acc,
                [day]: openingHours,
              }),
              {} as any
            )}
        />
      </AccordionDetails>
    </Accordion>
  );
};
