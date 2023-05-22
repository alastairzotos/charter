import React from "react";
import { TabsProvider, TabsView } from "ui";

import { BookingAnalyticsAll } from "components/admin/bookings/booking-analytics-all";
import { BookingAnalyticsOperator } from "components/admin/bookings/booking-analytics-operator";

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
      ]}
    >
      <TabsView />
    </TabsProvider>
  );
};
