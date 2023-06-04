import { InstanceDto } from "./instance";

export interface FeedbackDto {
  _id: string;
  name: string;
  email: string;
  text: string;
  instance?: InstanceDto;
}

export type FeedbackNoId = Omit<FeedbackDto, "_id">;
