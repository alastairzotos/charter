import { OperatorDto } from "dtos";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { OperatorSearch } from "ui";
import { urls } from "urls";

import { useLoadOperators } from "state/operators";

const BookingsPage: NextPage = () => {
  const router = useRouter();

  const state = useLoadOperators();

  const handleSelectOperator = (operator: OperatorDto) => {
    router.push(urls.admin.operatorBookings(operator._id));
  };

  return (
    <OperatorSearch state={state} onSelectOperator={handleSelectOperator} />
  );
};

BookingsPage.getInitialProps = () => ({});

export default BookingsPage;
