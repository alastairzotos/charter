import { LoggedInUserDetails } from "./auth";
import { InstanceDto } from "./instance";
import { OpeningTimesDto } from "./opening-times";

export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  slug: string;
  address: string;
  photo: string;
  description: string;
  openingTimes: OpeningTimesDto;
  owner?: LoggedInUserDetails;
  instance?: InstanceDto;
}

export type OperatorNoId = Omit<OperatorDto, "_id">;
