import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { defaultOpeningDayTime, OpeningHoursDto } from "dtos";
import React from "react";

interface Props {
  openingTimes: OpeningHoursDto;
  setOpeningTimes: (openingTimes: OpeningHoursDto) => void;
}

export const OpeningTimesDayForm: React.FC<Props> = ({
  openingTimes,
  setOpeningTimes,
}) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }} gap={1}>
      <TextField
        size="small"
        sx={{ flexGrow: 1 }}
        disabled={openingTimes.allDay || openingTimes.closed}
        type="time"
        label="Opening time"
        value={openingTimes.openingTime || defaultOpeningDayTime.openingTime}
        onChange={(e) =>
          setOpeningTimes({ ...openingTimes, openingTime: e.target.value })
        }
      />

      <TextField
        size="small"
        sx={{ flexGrow: 1 }}
        disabled={openingTimes.allDay || openingTimes.closed}
        type="time"
        label="Closing time"
        value={openingTimes.closingTime || defaultOpeningDayTime.closingTime}
        onChange={(e) =>
          setOpeningTimes({ ...openingTimes, closingTime: e.target.value })
        }
      />

      <FormControlLabel
        label="All day"
        disabled={openingTimes.closed}
        control={
          <Checkbox
            checked={openingTimes.allDay}
            onChange={(e) =>
              setOpeningTimes({ ...openingTimes, allDay: e.target.checked })
            }
          />
        }
      />

      <FormControlLabel
        label="Closed"
        control={
          <Checkbox
            checked={openingTimes.closed}
            onChange={(e) =>
              setOpeningTimes({ ...openingTimes, closed: e.target.checked })
            }
          />
        }
      />
    </Box>
  );
};
