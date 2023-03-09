import { OperatorDto } from "dtos";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorSearch } from "src/components/operator-search";

const BookingsPage: NextPage = () => {
  const router = useRouter();

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

      <OperatorSearch onSelectOperator={handleSelectOperator} />
    </>
  );
};

BookingsPage.getInitialProps = () => ({});

export default BookingsPage;
