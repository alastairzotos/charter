import React from "react";
import { TabsProvider, TabsView } from "ui";

import { ServiceTypeEdit } from "components/admin/service-types/types/service-type-edit";
import { ServiceTypeVariants } from "components/admin/service-types/variants/service-type-variants";

interface Props {
  id: string;
}

export const ServiceTypeManageTabs: React.FC<Props> = ({ id }) => {
  return (
    <TabsProvider
      tabs={[
        {
          label: "Edit",
          content: <ServiceTypeEdit id={id} />,
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
