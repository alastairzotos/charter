import {
  getDefaultValuesForServiceSchema,
  ServiceNoId,
  ServiceType,
} from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { getSchemaForServiceType } from "service-schemas";
import { urls } from "urls";

import { ManageServiceForm } from "src/components/service-manage";
import { useCreateService } from "src/state/services";

interface Props {
  operatorId: string;
  type: ServiceType;
}

export const ServiceCreate: React.FC<Props> = ({ operatorId, type }) => {
  const router = useRouter();

  const [createServiceStatus, createService] = useCreateService((s) => [
    s.status,
    s.request,
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
        type,
        name: "",
        description: "",
        photos: [],
        price: {},
        data: getDefaultValuesForServiceSchema(getSchemaForServiceType(type)),
        operator: operatorId as any, // This will be cast as an ObjectId in the backend
      }}
      onSave={handleCreateService}
      saveStatus={createServiceStatus}
    />
  );
};
