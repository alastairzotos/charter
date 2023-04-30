import { LoggedInUserDetails } from "./auth";

export interface InstanceDto {
  _id: string;
  name: string;
  url: string;
  admins?: LoggedInUserDetails[];
}

export type InstanceNoId = Omit<InstanceDto, "_id">;
