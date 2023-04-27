import { BookingDateForm } from "components/screens/site/screens/booking-form/lib/booking-default-forms/booking-date-form";
import { BookingNumberOfPeopleForm } from "components/screens/site/screens/booking-form/lib/booking-default-forms/booking-number-of-people-form";
import { BookingTimeForm } from "components/screens/site/screens/booking-form/lib/booking-default-forms/booking-time-form";
import { BookingDefaultFormsProps } from "components/screens/site/screens/booking-form/lib/booking-default-forms/props";
import { ServiceSchemaDto } from "dtos";
import React from "react";

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
