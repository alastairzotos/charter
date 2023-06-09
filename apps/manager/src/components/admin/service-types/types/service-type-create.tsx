import CloseIcon from "@mui/icons-material/Close";
import { ServiceSchemaCategoryNoId } from "dtos";
import React from "react";

import { ServiceTypeManage } from "components/admin/service-types/types/service-type-manage";
import { useCreateServiceSchemaCategory } from "state/service-schema-categories";

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

export const ServiceTypeCreate: React.FC<Props> = ({ onCreated, onCancel }) => {
  const { status, request } = useCreateServiceSchemaCategory();

  const handleCreateServiceSchemaCategory = async (
    serviceSchemaCategory: ServiceSchemaCategoryNoId
  ) => {
    await request(serviceSchemaCategory);
    onCreated();
  };

  return (
    <ServiceTypeManage
      title="Create service type"
      onSave={handleCreateServiceSchemaCategory}
      actionIcon={<CloseIcon />}
      onActionClick={onCancel}
      saveStatus={status}
      initialValues={{
        name: "Restaurant",
        pluralName: "Restaurants",
        description: "",
        photo: "",
        hidden: false,
      }}
    />
  );
};
