import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { ManageOperatorForm } from "src/components/operator-manage";
import { useOperatorsState } from "src/state/operators";

interface Props {
  id: string;
}

export const OperatorEdit: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useOperatorsState(
    (s) => [s.loadOperatorStatus, s.loadOperator, s.operator]
  );
  const [updateOperatorStatus, updateOperator] = useOperatorsState((s) => [
    s.updateOperatorStatus,
    s.updateOperator,
  ]);
  const [deleteOperatorStatus, deleteOperator] = useOperatorsState((s) => [
    s.deleteOperatorStatus,
    s.deleteOperator,
  ]);

  useEffect(() => {
    if (id) {
      loadOperator(id);
    }
  }, [id]);

  return (
    <Fetchable
      status={loadOperatorStatus}
      error={<Typography>There was an error loading the operator</Typography>}
    >
      <ManageOperatorForm
        title="Edit operator"
        operator={operator!}
        onSave={(newOperator) => updateOperator(id, newOperator)}
        saveStatus={updateOperatorStatus}
        onDelete={() => deleteOperator(id)}
        deleteStatus={deleteOperatorStatus}
      />
    </Fetchable>
  );
};
