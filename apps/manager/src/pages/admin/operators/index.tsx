import { Button } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { OperatorSearch } from "ui";
import { urls } from "urls";

import { useLoadOperators } from "state/operators";

const OperatorsPage: NextPage = () => {
  const router = useRouter();
  const state = useLoadOperators();

  return (
    <>
      <OperatorSearch
        state={state}
        onSelectOperator={(operator) =>
          router.push(urls.admin.operator(operator._id))
        }
      />

      <div>
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          component={Link}
          href={urls.admin.operatorsCreate()}
        >
          Create
        </Button>
      </div>
    </>
  );
};

OperatorsPage.getInitialProps = () => ({});

export default OperatorsPage;
