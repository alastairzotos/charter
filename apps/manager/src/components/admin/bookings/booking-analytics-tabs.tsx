import React from "react";
import { TabsProvider, TabsView } from "ui";

import { BookingAnalyticsAll } from "components/admin/bookings/booking-analytics-all";
import { BookingAnalyticsOperator } from "components/admin/bookings/booking-analytics-operator";
import { BookingByRef } from "components/admin/bookings/booking-by-ref";

export const BookingAnalyticsTabs: React.FC = () => {
  return (
    <TabsProvider
      tabs={[
        {
          label: "All",
          content: <BookingAnalyticsAll />,
        },
        {
          label: "For operator",
          content: <BookingAnalyticsOperator />,
        },
        {
          label: "By Booking Ref",
          content: <BookingByRef />,
        },
      ]}
    >
      <TabsView />
    </TabsProvider>
  );
};
