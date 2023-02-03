import { ServiceNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ManageServiceForm } from "src/components/service-manage";
import { useServicesState } from "src/state/services";

interface Props {
  operatorId: string;
}

export const ServiceCreate: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();
  const [createServiceStatus, createService] = useServicesState((s) => [
    s.createServiceStatus,
    s.createService,
  ]);

  const handleCreateService = async (service: ServiceNoId) => {
    await createService(service);
    router.push(urls.admin.operator(operatorId));
  };

  return (
    <ManageServiceForm
      title="Create service"
      operatorId={operatorId}
      service={{
        name: "",
        duration: "",
        startLocation: "",
        startTime: "",
        description: "",
        photos: [],
        adultPrice: 0,
        childPrice: 0,
        operator: operatorId as any, // This will be cast as an ObjectId in the backend
      }}
      onSave={handleCreateService}
      saveStatus={createServiceStatus}
    />
  );
};
