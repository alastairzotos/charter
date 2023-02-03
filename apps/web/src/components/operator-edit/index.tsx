import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { ManageOperatorForm } from "src/components/operator-manage";
import {
  useDeleteOperator,
  useLoadOperator,
  useUpdateOperator,
} from "src/state/operators";

interface Props {
  id: string;
}

export const OperatorEdit: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useLoadOperator((s) => [
    s.status,
    s.request,
    s.value,
  ]);
  const [updateOperatorStatus, updateOperator] = useUpdateOperator((s) => [
    s.status,
    s.request,
  ]);
  const [deleteOperatorStatus, deleteOperator] = useDeleteOperator((s) => [
    s.status,
    s.request,
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
