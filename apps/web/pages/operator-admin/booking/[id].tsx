import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { OperatorBooking } from "src/components/operator-booking";

const OperatorBookingPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return <OperatorBooking id={id} />;
};

export default OperatorBookingPage;
