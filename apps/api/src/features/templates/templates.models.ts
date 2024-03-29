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
    details: Array<{ key: string; value: string }>;
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
    details: Array<{ key: string; value: string }>;
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
  };
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
    details: Array<{ key: string; value: string }>;
  };
  operator: {
    details: Array<{ key: string; value: string }>;
  };
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
  };
}

export interface OperatorPromotedProps {
  operator: {
    name: string;
  };
  site: {
    name: string;
    url: string;
    resetPasswordUrl: string;
  };
  app: {
    url: string;
  };
}

export interface BookingMadeAdminProps {
  operator: {
    name: string;
    url: string;
  };
  service: {
    name: string;
    url: string;
  };
  booking: {
    date: string;
    details: Array<{ key: string; value: string }>;
  };
}

export interface FeedbackAddedProps {
  name: string;
  email: string;
  text: string;
}

export interface BookingExpiredUser {
  user: {
    name: string;
  };
  service: {
    url: string;
    name: string;
  };
  site: {
    url: string;
  };
}

export interface BookingExpiredOperator {
  operator: {
    name: string;
  };
  service: {
    name: string;
  };
  booking: {
    date: string;
  };
}

export interface ForgotPasswordProps {
  name: string;
  expires: string;
  resetPasswordUrl: string;
}
