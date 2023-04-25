import { LoggedInUserDetails } from "./auth";
import { OpeningTimesDto } from "./opening-times";

export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  slug: string;
  phoneNumber: string;
  address: string;
  photo: string;
  description: string;
  openingTimes: OpeningTimesDto;
  owner?: LoggedInUserDetails;
}

export type OperatorNoId = Omit<OperatorDto, "_id">;
