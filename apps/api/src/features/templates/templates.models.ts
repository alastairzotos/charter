export interface BookingMadeUserProps {
  user: {
    name: string;
  };
  operator: {
    name: string;
    url: string;
  };
  service: {
    name: string;
    url: string;
  };
  booking: {
    url: string;
  };
}
