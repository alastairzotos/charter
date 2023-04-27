import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { Titled } from "components/lib/_core/titled";
import { OperatorSummary } from "components/lib/backend/operator/dashboard/operator/operator-summary";
import { ServiceList } from "components/lib/backend/operator/dashboard/services/service-list";
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
