import { OperatorNoId } from 'dtos';
import { useRouter } from 'next/router';
import React from 'react';
import { useOperatorsState } from '../../state/operators';
import { urls } from '../../urls';
import { ManageOperatorForm } from '../operator-manage';

export const OperatorCreate: React.FC = () => {
  const router = useRouter();
  const [createOperatorsStatus, createOperator] = useOperatorsState(s => [s.createOperatorStatus, s.createOperator]);

  const handleCreateOperator = async (operator: OperatorNoId) => {
    await createOperator(operator);
    router.push(urls.admin.operators());
  }
  
  return (
    <ManageOperatorForm
      title="Create operator"
      operator={{
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        photo: ''
      }}

      onSave={handleCreateOperator}
      saveStatus={createOperatorsStatus}
    />
  )
}
