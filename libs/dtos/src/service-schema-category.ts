import { InstanceDto } from "./instance";

export interface ServiceSchemaCategoryDto {
  _id: string;
  name: string;
  pluralName: string;
  description: string;
  photo: string;
  instance?: InstanceDto;
}

export type ServiceSchemaCategoryNoId = Omit<ServiceSchemaCategoryDto, "_id">;
