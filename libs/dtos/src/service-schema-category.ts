
export interface ServiceSchemaCategoryDto {
  _id: string;
  name: string;
  photo: string;
}

export type ServiceSchemaCategoryNoId = Omit<ServiceSchemaCategoryDto, '_id'>;
