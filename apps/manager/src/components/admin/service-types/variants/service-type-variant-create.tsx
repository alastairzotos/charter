import { ServiceSchemaDto, ServiceSchemaNoId } from "dtos";
import React from "react";

import { ManageServiceTypeVariantForm } from "components/admin/service-types/variants/service-type-variant-manage";
import { useCreateServiceSchema } from "state/service-schemas";

interface Props {
  schemaCategoryId: string;
  attemptToUseVariant: ServiceSchemaDto | undefined;
  onCreated: () => void;
  onCancel: () => void;
}

export const ServiceTypeVariantCreate: React.FC<Props> = ({
  schemaCategoryId,
  attemptToUseVariant,
  onCreated,
  onCancel,
}) => {
  const [createSchemaStatus, createSchema] = useCreateServiceSchema((s) => [
    s.status,
    s.request,
  ]);

  const handleCreateServiceSchema = async (
    serviceSchema: ServiceSchemaNoId
  ) => {
    await createSchema(serviceSchema);
    onCreated();
  };

  const defaultVariant: ServiceSchemaNoId = {
    name: "New variant",
    schemaCategory: schemaCategoryId as any,
    defaultBookingFields: ["date", "time"],
    pricingStrategy: "fixed",
    shouldPayNow: true,
    fields: [],
    contentSections: [],
    additionalBookingFields: [],
  };

  let useVariant = defaultVariant;
  if (!!attemptToUseVariant) {
    const {
      _id, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...variant
    } = attemptToUseVariant;

    useVariant = {
      ...variant,
      name: "New variant",
    };
  }

  return (
    <ManageServiceTypeVariantForm
      title="Create variant"
      onSave={handleCreateServiceSchema}
      saveStatus={createSchemaStatus}
      onCancel={onCancel}
      initialValues={useVariant}
    />
  );
};
