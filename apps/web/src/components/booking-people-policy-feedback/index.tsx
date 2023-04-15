import { Typography } from "@mui/material";
import { BookingNoId, ServiceDto } from "dtos";
import React, { useEffect } from "react";
import { bookingSatisfiesPeoplePolicy } from "utils";

interface Props {
  booking: Omit<BookingNoId, "status">;
  service: ServiceDto;
  setError: (error: boolean) => void;
}

export const BookingPeoplePolicyFeedback: React.FC<Props> = ({
  booking,
  service,
  setError,
}) => {
  const satisfies = bookingSatisfiesPeoplePolicy(
    booking as unknown as BookingNoId,
    service
  );

  useEffect(() => {
    setError(satisfies === "too-few" || satisfies === "too-many");
  }, []);

  const peoplePolicyText =
    service.minPeople !== null && service.maxPeople !== null
      ? `This service expects a minimum of ${service.minPeople} people and maximum of ${service.maxPeople} people`
      : service.minPeople !== null
      ? `This service expects a minimum of ${service.minPeople} people`
      : service.maxPeople !== null
      ? `This service expects a maximum of ${service.maxPeople} people`
      : null;

  return (
    <>
      {peoplePolicyText && (
        <Typography variant="caption">{peoplePolicyText}</Typography>
      )}

      {satisfies === "too-few" && (
        <Typography color="error">Too few people</Typography>
      )}
      {satisfies === "too-many" && (
        <Typography color="error">Too many people</Typography>
      )}
    </>
  );
};
