import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { OperatorSummary } from "src/components/operator-summary";
import { Titled } from "src/components/titled";
import { TripList } from "src/components/trip-list";
import { useOperatorsState } from "src/state/operators";

interface Props {
  id: string;
}

export const OperatorItem: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useOperatorsState(
    (s) => [s.loadOperatorStatus, s.loadOperator, s.operator]
  );

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

      <Titled title="Trips">
        <TripList operatorId={id} />
      </Titled>
    </>
  );
};
