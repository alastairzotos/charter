export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;

export interface TripDto {
  _id: string;
  operator: OperatorDto;
  name: string;
  duration: string;
  startLocation: string;
  startTime: string;
  description: string;
  photos: string[];
  adultPrice: number;
  childPrice: number;
}

export type TripNoId = Omit<TripDto, '_id'>;

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface BookingDto {
  _id: string;
  trip: TripDto;
  operator: OperatorDto;
  name: string;
  email: string;
  date: string;
  adultGuests: number;
  childGuests: number;
  status: BookingStatus;
}

export type BookingNoId = Omit<BookingDto, '_id'>;

export interface LoginResponse {
  accessToken: string;
}

export interface UserDetails {
  email: string;
  givenName: string;
  role?: 'user' | 'admin' | 'operator';
}

export interface RegisterDetails extends UserDetails {
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface LoggedInUserDetails extends UserDetails {
  _id: string;
}
