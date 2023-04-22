import { FormLabel, Paper } from "@mui/material";
import { Day, days, OpeningHoursDto, OpeningTimesDto } from "dtos";
import React from "react";

import { KeyValues } from "components/key-values";
import { OpeningTimesDayForm } from "components/opening-times-form/day-form";

interface Props {
  openingTimes: Record<Day, OpeningHoursDto>;
  setOpeningTimes: (openingTimes: OpeningTimesDto) => void;
}

export const OpeningTimesForm: React.FC<Props> = ({
  openingTimes,
  setOpeningTimes,
}) => {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <FormLabel>Opening times</FormLabel>

      <KeyValues
        sx={{ width: "100%" }}
        kv={days.reduce(
          (acc, day) => ({
            ...acc,
            [day]: (
              <OpeningTimesDayForm
                key={day}
                openingTimes={openingTimes[day]}
                setOpeningTimes={(hours) =>
                  setOpeningTimes({
                    ...openingTimes,
                    [day]: hours,
                  })
                }
              />
            ),
          }),
          {} as Record<string, React.ReactNode>
        )}
      />
    </Paper>
  );
};
