import { ServiceSchemaDto } from "dtos";
import React from "react";

import { BookingDateForm } from "src/components/booking-default-forms/booking-date-form";
import { BookingNumberOfPeopleForm } from "src/components/booking-default-forms/booking-number-of-people-form";
import { BookingTimeForm } from "src/components/booking-default-forms/booking-time-form";
import { BookingDefaultFormsProps } from "src/components/booking-default-forms/props";

interface Props extends BookingDefaultFormsProps {
  schema: ServiceSchemaDto;
}

export const BookingDefaultForms: React.FC<Props> = ({ schema, ...props }) => {
  return (
    <>
      {schema.defaultBookingFields.includes("date") && (
        <BookingDateForm {...props} />
      )}

      {schema.defaultBookingFields.includes("time") && (
        <BookingTimeForm {...props} />
      )}

      {schema.defaultBookingFields.includes("numberOfPeople") && (
        <BookingNumberOfPeopleForm {...props} />
      )}
    </>
  );
};
