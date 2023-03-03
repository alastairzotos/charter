import { ServiceSchemaNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ManageServiceSchemaForm } from "src/components/service-schema-manage";
import { useCreateServiceSchema } from "src/state/service-schemas";

export const ServiceSchemaCreate: React.FC = () => {
  const router = useRouter();

  const { status, request } = useCreateServiceSchema();

  const handleCreateServiceSchema = async (
    serviceSchema: ServiceSchemaNoId
  ) => {
    await request(serviceSchema);
    router.push(urls.admin.serviceSchemas());
  };

  return (
    <ManageServiceSchemaForm
      title="Create service schema"
      onSave={handleCreateServiceSchema}
      saveStatus={status}
      serviceSchema={{
        name: "Restaurant",
        schemaCategory: null,
        defaultBookingFields: [],
        pricingStrategy: "fixed",
        shouldPayNow: true,
        fields: [],
      }}
    />
  );
};
