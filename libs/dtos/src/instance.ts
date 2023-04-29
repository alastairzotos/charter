export interface InstanceDto {
  _id: string;
  name: string;
}

export type InstanceNoId = Omit<InstanceDto, "_id">;
