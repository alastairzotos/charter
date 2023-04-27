import { List } from "@mui/material";
import { OperatorDto } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { OperatorSearch } from "ui";
import { urls } from "urls";

import { UserOperatorListItem } from "components/lib/site/operators/user-operator-list-item";
import { useLoadOperators } from "state/operators";

interface Props {
  operators: OperatorDto[];
}

export const UserOperatorsList: React.FC<Props> = ({ operators }) => {
  const router = useRouter();
  const state = useLoadOperators();

  return (
    <>
      <OperatorSearch
        state={state}
        onSelectOperator={(operator) =>
          router.push(urls.user.operator(operator))
        }
      />

      <List sx={{ mt: 2, width: "100%" }}>
        {operators.map((operator) => (
          <UserOperatorListItem key={operator._id} operator={operator} />
        ))}
      </List>
    </>
  );
};
