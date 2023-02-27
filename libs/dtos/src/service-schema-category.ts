
export interface ServiceSchemaCategoryDto {
  _id: string;
  name: string;
  pluralName: string;
  photo: string;
}

export type ServiceSchemaCategoryNoId = Omit<ServiceSchemaCategoryDto, '_id'>;
