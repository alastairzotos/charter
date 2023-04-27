import { TextField } from "@mui/material";
import {
  defaultOpeningDayTime,
  getOpeningTimesOnDay,
  OpeningTimesDto,
  timeIsOutOfOpeningHours,
} from "dtos";
import React, { useCallback } from "react";

import { BookingDefaultFormsProps } from "components/booking-form/booking-default-forms/props";
import { formatTime } from "util/misc";

export const BookingTimeForm: React.FC<BookingDefaultFormsProps> = ({
  values,
  setValues,
  isSubmitting,
}) => {
  const getHelperText = useCallback(
    (openingTimes: OpeningTimesDto, type: "operator" | "service") => {
      if (!timeIsOutOfOpeningHours(openingTimes, values.date, values.time)) {
        return undefined;
      }

      const openingTimesOnDay = getOpeningTimesOnDay(openingTimes, values.date);

      if (openingTimesOnDay.closed) {
        return `${
          type === "operator" ? "Operator" : "Service"
        } is closed on this date`;
      }

      return `${
        type === "operator" ? "Operator" : "Service"
      } opening hours are ${formatTime(
        openingTimesOnDay.openingTime || defaultOpeningDayTime.openingTime!
      )} to ${formatTime(
        openingTimesOnDay.closingTime || defaultOpeningDayTime.closingTime!
      )}`;
    },
    [values.date, values.time]
  );

  return (
    <TextField
      label="Time"
      type="time"
      value={values.time}
      onChange={(e) => setValues({ ...values, time: e.currentTarget.value })}
      disabled={
        !!isSubmitting ||
        getOpeningTimesOnDay(values.operator.openingTimes, values.date)
          .closed ||
        getOpeningTimesOnDay(values.service.openingTimes, values.date).closed
      }
      inputProps={{ step: 300 }}
      error={
        timeIsOutOfOpeningHours(
          values.operator.openingTimes,
          values.date,
          values.time
        ) ||
        timeIsOutOfOpeningHours(
          values.service.openingTimes,
          values.date,
          values.time
        )
      }
      helperText={
        getHelperText(values.operator.openingTimes, "operator") ||
        getHelperText(values.service.openingTimes, "service")
      }
    />
  );
};
