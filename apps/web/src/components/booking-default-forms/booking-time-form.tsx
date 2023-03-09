import { TextField } from "@mui/material";
import dayjs from "dayjs";
import {
  dayNumberToDayMap,
  defaultOpeningDayTime,
  defaultOpeningTimes,
  OperatorOpeningHoursDto,
} from "dtos";
import React from "react";

import { BookingDefaultFormsProps } from "src/components/booking-default-forms/props";
import { formatTime } from "src/util/misc";

export const BookingTimeForm: React.FC<BookingDefaultFormsProps> = ({
  values,
  setValues,
  isSubmitting,
}) => {
  const getOpeningTimesOnDay = () => {
    const openingTimes = values.operator.openingTimes || defaultOpeningTimes;
    const openingTimesOnDay: OperatorOpeningHoursDto = {
      ...defaultOpeningDayTime,
      ...openingTimes[dayNumberToDayMap[dayjs(values.date).day()]],
    };

    return openingTimesOnDay;
  };

  const timeIsOutOfOpeningHours = () => {
    if (!values.operator.openingTimes) {
      return false;
    }

    if (!values.date) {
      return false;
    }

    const openingTimesOnDay = getOpeningTimesOnDay();

    if (openingTimesOnDay.allDay) {
      return false;
    }

    if (openingTimesOnDay.closed) {
      return true;
    }

    const openingTime = dayjs(openingTimesOnDay.openingTime, "HH:mm");
    const closingTime = dayjs(openingTimesOnDay.closingTime, "HH:mm");

    const time = dayjs(values.time, "HH:mm");
    const isAfterOpening =
      time.hour() < openingTime.hour()
        ? false
        : time.minute() >= openingTime.minute();
    const isBeforeClosing =
      time.hour() > closingTime.hour()
        ? false
        : time.minute() <= openingTime.minute();

    return !(isAfterOpening && isBeforeClosing);
  };

  const getHelperText = () => {
    if (!timeIsOutOfOpeningHours()) {
      return undefined;
    }

    const openingTimesOnDay = getOpeningTimesOnDay();

    if (openingTimesOnDay.closed) {
      return "Operator is closed on this date";
    }

    return `Opening hours are ${formatTime(
      openingTimesOnDay.openingTime || defaultOpeningDayTime.openingTime!
    )} to ${formatTime(
      openingTimesOnDay.closingTime || defaultOpeningDayTime.closingTime!
    )}`;
  };

  return (
    <TextField
      label="Time"
      type="time"
      value={values.time}
      onChange={(e) => setValues({ ...values, time: e.currentTarget.value })}
      disabled={!!isSubmitting || getOpeningTimesOnDay().closed}
      inputProps={{ step: 300 }}
      error={timeIsOutOfOpeningHours()}
      helperText={getHelperText()}
    />
  );
};
