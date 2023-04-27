import { Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { useLoadOperatorByOwner } from "state/operators";
import { useUserState } from "state/users";

interface Props {
  children: (operator: OperatorDto) => React.ReactNode;
}

export const OperatorDashboardPage: React.FC<Props> = ({ children }) => {
  const loggedInUser = useUserState((s) => s.loggedInUser);
  const [status, request, value] = useLoadOperatorByOwner((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (loggedInUser) {
      request();
    }
  }, [loggedInUser]);

  return (
    <StatusSwitch
      status={status}
      error={
        <Typography>
          There was an error loading your account. Please try again later.
        </Typography>
      }
    >
      {value && children(value)}
    </StatusSwitch>
  );
};
