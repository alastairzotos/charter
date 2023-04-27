import { ServiceSchemaDto } from "dtos";
import React from "react";

import { BookingDateForm } from "components/lib/site/booking-form/booking-default-forms/booking-date-form";
import { BookingNumberOfPeopleForm } from "components/lib/site/booking-form/booking-default-forms/booking-number-of-people-form";
import { BookingTimeForm } from "components/lib/site/booking-form/booking-default-forms/booking-time-form";
import { BookingDefaultFormsProps } from "components/lib/site/booking-form/booking-default-forms/props";

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
