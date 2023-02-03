import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { OperatorSummary } from "src/components/operator-summary";
import { ServiceList } from "src/components/service-list";
import { Titled } from "src/components/titled";
import { useLoadOperator } from "src/state/operators";

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
      <Fetchable
        status={loadOperatorStatus}
        error={<Typography>There was an error loading the operator</Typography>}
      >
        <OperatorSummary operator={operator!} />
      </Fetchable>

      <Divider sx={{ mb: 3, mt: 3 }} />

      <Titled title="Services">
        <ServiceList operatorId={id} />
      </Titled>
    </>
  );
};
