import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { OperatorSummary } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/lib/operator-summary";
import { ServiceList } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-list";
import { StatusSwitch } from "components/lib/status-switch";
import { Titled } from "components/lib/titled";
import { useLoadOperator } from "state/operators";

interface Props {
  id: string;
}

export const OperatorItem: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useLoadOperator((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (id) {
      loadOperator(id);
    }
  }, [id]);

  return (
    <>
      <StatusSwitch
        status={loadOperatorStatus}
        error={<Typography>There was an error loading the operator</Typography>}
      >
        <OperatorSummary operator={operator!} />
      </StatusSwitch>

      <Divider sx={{ mb: 3, mt: 3 }} />

      <Titled title="Services">
        <ServiceList operatorId={id} />
      </Titled>
    </>
  );
};
