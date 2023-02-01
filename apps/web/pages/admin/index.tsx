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

      <Link href={urls.admin.operators()}>Operators</Link>
    </>
  );
};

export default AdminPage;
