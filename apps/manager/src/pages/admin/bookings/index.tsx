import { OperatorDto } from "dtos";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { useLoadOperators } from "state/operators";
import { OperatorSearch } from "ui";

const BookingsPage: NextPage = () => {
  const router = useRouter();

  const state = useLoadOperators();

  const handleSelectOperator = (operator: OperatorDto) => {
    router.push(urls.admin.operatorBookings(operator._id));
  };

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Bookings"
      />

      <OperatorSearch state={state} onSelectOperator={handleSelectOperator} />
    </>
  );
};

BookingsPage.getInitialProps = () => ({});

export default BookingsPage;
