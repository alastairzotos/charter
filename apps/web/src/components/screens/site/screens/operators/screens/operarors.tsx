import { List } from "@mui/material";
import { OperatorSearch } from "components/screens/backend/screens/admin/screens/operators/screens/operator-search";
import { UserOperatorListItem } from "components/screens/site/screens/operators/lib/user-operator-list-item";
import { OperatorDto } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

interface Props {
  operators: OperatorDto[];
}

export const UserOperatorsList: React.FC<Props> = ({ operators }) => {
  const router = useRouter();

  return (
    <>
      <OperatorSearch
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
