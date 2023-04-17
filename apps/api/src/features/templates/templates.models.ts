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
    qrCodeUrl: string;
  };
}

export interface BookingMadeOperatorProps {
  operator: {
    name: string;
  };
  service: {
    name: string;
    url: string;
  };
  booking: {
    date: string;
    url: string;
    details: Array<{ key: string, value: string }>;
  };
}

export interface BookingMadeOperatorActionRequiredProps {
  operator: {
    name: string;
  };
  service: {
    name: string;
    url: string;
  };
  booking: {
    date: string;
    url: string;
    details: Array<{ key: string, value: string }>;
  };
}

export interface BookingMadeUserPendingProps {
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
  }
}

export interface BookingConfirmedUserProps {
  user: {
    name: string;
  };
  service: {
    name: string;
    url: string;
  };
  booking: {
    url: string;
    qrCodeUrl: string;
  }
}

export interface BookingRejectedUserProps {
  user: {
    name: string;
  };
  service: {
    name: string;
    url: string;
  };
  site: {
    url: string;
  }
}
