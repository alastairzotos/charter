import { InstanceNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ManageInstanceForm } from "components/super-admin/instances/instance-manage";
import { useCreateInstance } from "state/instances";

export const InstanceCreate: React.FC = () => {
  const router = useRouter();
  const [createInstanceStatus, createInstance] = useCreateInstance((s) => [
    s.status,
    s.request,
  ]);

  const handleCreateInstance = async (instance: InstanceNoId) => {
    console.log(instance);
    await createInstance(instance);
    router.push(urls.superAdmin.instances());
  };

  return (
    <ManageInstanceForm
      title="Create instance"
      initialValues={{
        name: "",
      }}
      onSave={handleCreateInstance}
      saveStatus={createInstanceStatus}
    />
  );
};
