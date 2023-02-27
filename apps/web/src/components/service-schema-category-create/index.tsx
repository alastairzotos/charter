import { ServiceSchemaCategoryNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ServiceSchemaCategoryManage } from "src/components/service-schema-category-manage";
import { useCreateServiceSchemaCategory } from "src/state/service-schema-categories";

export const ServiceSchemaCategoryCreate: React.FC = () => {
  const router = useRouter();

  const { status, request } = useCreateServiceSchemaCategory();

  const handleCreateServiceSchemaCategory = async (
    serviceSchemaCategory: ServiceSchemaCategoryNoId
  ) => {
    await request(serviceSchemaCategory);
    router.push(urls.admin.serviceSchemaCategories());
  };

  return (
    <ServiceSchemaCategoryManage
      title="Create service schema category"
      onSave={handleCreateServiceSchemaCategory}
      saveStatus={status}
      serviceSchemaCategory={{
        name: "Restaurant",
        pluralName: "Restaurants",
        photo: "",
      }}
    />
  );
};
