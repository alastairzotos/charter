import React, { useEffect } from 'react';
import { CircularProgress, Typography, Paper } from '@mui/material';
import { useOperatorsState } from '../../state/operators';
import { ManageOperatorForm } from '../operator-manage';

interface Props {
  id: string;
}

export const OperatorItem: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useOperatorsState(s => [s.loadOperatorStatus, s.loadOperator, s.operator]);
  const [updateOperatorStatus, updateOperator] = useOperatorsState(s => [s.updateOperatorStatus, s.updateOperator]);
  const [deleteOperatorStatus, deleteOperator] = useOperatorsState(s => [s.deleteOperatorStatus, s.deleteOperator]);

  useEffect(() => {
    if (id) {
      loadOperator(id);
    }
  }, [id]);

  return (
    <>
      {loadOperatorStatus === 'fetching' && <CircularProgress />}
      {loadOperatorStatus === 'error' && <Typography>There was an error loading the operator</Typography>}
      {(loadOperatorStatus === 'success' && !!operator) && (
        <ManageOperatorForm
          title="Edit operator"
          id={id}
          operator={operator}
          onSave={newOperator => updateOperator(id, newOperator)}
          saveStatus={updateOperatorStatus}

          onDelete={() => deleteOperator(id)}
          deleteStatus={deleteOperatorStatus}
        />
      )}
    </>
  )
}
