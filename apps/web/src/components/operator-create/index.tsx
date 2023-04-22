import { defaultOpeningTimes, OperatorNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ManageOperatorForm } from "components/operator-manage";
import { useCreateOperator } from "state/operators";

export const OperatorCreate: React.FC = () => {
  const router = useRouter();
  const [createOperatorsStatus, createOperator] = useCreateOperator((s) => [
    s.status,
    s.request,
  ]);

  const handleCreateOperator = async (operator: OperatorNoId) => {
    await createOperator(operator);
    router.push(urls.admin.operators());
  };

  return (
    <ManageOperatorForm
      title="Create operator"
      operator={{
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        description: "",
        photo: "",
        openingTimes: defaultOpeningTimes,
      }}
      onSave={handleCreateOperator}
      saveStatus={createOperatorsStatus}
    />
  );
};
