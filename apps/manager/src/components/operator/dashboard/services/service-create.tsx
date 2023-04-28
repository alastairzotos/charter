import { Typography } from "@mui/material";
import {
  defaultOpeningTimes,
  getDefaultValuesForServiceSchema,
  ServiceNoId,
} from "dtos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ManageServiceForm } from "components/operator/dashboard/services/service-manage";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { useLoadServiceSchemaById } from "state/service-schemas";
import { useCreateService } from "state/services";

interface Props {
  serviceSchemaId: string;
  operatorId: string;
}

export const ServiceCreate: React.FC<Props> = ({
  serviceSchemaId,
  operatorId,
}) => {
  const router = useRouter();
  const { getServiceCreatedRedirectUrl } = useOperatorDashboard();

  const [loadServiceSchemaStatus, loadServiceSchema, serviceSchema] =
    useLoadServiceSchemaById((s) => [s.status, s.request, s.value]);

  const [createServiceStatus, createService] = useCreateService((s) => [
    s.status,
    s.request,
  ]);

  useEffect(() => {
    if (serviceSchemaId) {
      loadServiceSchema(serviceSchemaId);
    }
  }, [serviceSchemaId]);

  const handleCreateService = async (service: ServiceNoId) => {
    await createService(service);
    router.push(getServiceCreatedRedirectUrl(operatorId));
  };

  return (
    <StatusSwitch
      status={loadServiceSchemaStatus}
      error={
        <Typography>There was an error loading the service schema</Typography>
      }
    >
      {serviceSchema && (
        <ManageServiceForm
          title="Create service"
          operatorId={operatorId}
          initialValues={{
            name: "",
            slug: "",
            description: "",
            content: {},
            photos: [],
            price: {
              fixed: {
                price: 10,
              },
              perAdultAndChild: {
                adultPrice: 50,
                childPrice: 10,
              },
              perAgeCohort: {
                ageCohorts: [
                  {
                    name: "Children",
                    fromAge: 1,
                    toAge: 10,
                    price: 10,
                  },
                  {
                    name: "Adults",
                    fromAge: 11,
                    toAge: 100,
                    price: 50,
                  },
                ],
              },
              perPerson: {
                price: 10,
              },
              tiered: {
                tiers: [
                  {
                    name: "Single",
                    rate: 10,
                  },
                  {
                    name: "Double",
                    rate: 20,
                  },
                ],
              },
            },
            maxPeople: null,
            minPeople: null,
            data: getDefaultValuesForServiceSchema(serviceSchema!),
            operator: operatorId as any, // This will be cast as an ObjectId in the backend
            serviceSchema,
            numberOfBookings: 0,
            hidden: false,
            approveBookingBeforePayment: false,
            openingTimes: defaultOpeningTimes,
            hasCutoffDays: true,
            cutoffDays: 1,
          }}
          onSave={handleCreateService}
          saveStatus={createServiceStatus}
        />
      )}
    </StatusSwitch>
  );
};
