import React from "react";
import { TabsProvider, TabsView } from "ui";

import { ServiceTypeEdit } from "components/admin/service-types/types/service-type-edit";
import { ServiceTypeVariants } from "components/admin/service-types/variants/service-type-variants";

interface Props {
  id: string;
  onDelete: () => void;
}

export const ServiceTypeManageTabs: React.FC<Props> = ({ id, onDelete }) => {
  return (
    <TabsProvider
      tabs={[
        {
          label: "Edit",
          content: <ServiceTypeEdit id={id} onDelete={onDelete} />,
        },
        {
          label: "Variants",
          content: <ServiceTypeVariants categoryId={id} />,
        },
      ]}
    >
      <TabsView />
    </TabsProvider>
  );
};
