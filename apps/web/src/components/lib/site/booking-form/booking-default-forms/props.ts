import { BookingNoId } from "dtos";

export interface BookingDefaultFormsProps {
  values: Omit<BookingNoId, "status">;
  setValues: (booking: Omit<BookingNoId, "status">) => void;
  isSubmitting: boolean;
}
