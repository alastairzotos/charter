export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
  description: string;
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;
