import { Button } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";

const AdminPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs
        list={[{ href: urls.home(), title: "Home" }]}
        current="Admin"
      />

      <Button component={Link} href={urls.admin.operators()}>
        Operators
      </Button>
      <div />
      <Button component={Link} href={urls.admin.serviceSchemas()}>
        Service schemas
      </Button>
    </>
  );
};

export default AdminPage;
