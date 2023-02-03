import { Button } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { OperatorListItem } from "src/components/operator-list-item";
import { StatusSwitch } from "src/components/status-switch";
import { useLoadOperators } from "src/state/operators";

export const OperatorsList: React.FC = () => {
  const [loadOperatorsStatus, loadOperators, operators] = useLoadOperators(
    (s) => [s.status, s.request, s.value]
  );

  useEffect(() => {
    if (!loadOperatorsStatus) {
      loadOperators();
    }
  }, [loadOperatorsStatus, loadOperators]);

  return (
    <StatusSwitch
      status={loadOperatorsStatus}
      error={<Typography>There was an error loading the operators</Typography>}
    >
      <List sx={{ width: "100%" }}>
        {operators?.map((operator) => (
          <OperatorListItem key={operator._id} operator={operator} />
        ))}
      </List>

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.operatorsCreate()}
        sx={{ mt: 3 }}
      >
        Create
      </Button>
    </StatusSwitch>
  );
};
