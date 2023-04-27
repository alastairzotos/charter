import React from "react";
import { urls } from "urls";

import { OperatorDashboardProvider } from "contexts/operator-dashboard";

export const AdminOperatorDashboardProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => (
  <OperatorDashboardProvider
    value={{
      getOperatorEditUrl: (operator) => urls.admin.operatorEdit(operator._id),
      isOperatorDeletable: () => true,
      getOperatorDeletedRedirectUrl: () => urls.admin.operators(),
      getServiceEditUrl: (operatorId, serviceId) =>
        urls.admin.service(operatorId, serviceId),
      getServiceCreateUrl: (operatorId, schemaId) =>
        urls.admin.servicesCreate(operatorId, schemaId),
      getServiceCreatedRedirectUrl: (operatorId) =>
        urls.admin.operator(operatorId),
      getServiceDeletedRedirectUrl: (operatorId) =>
        urls.admin.operator(operatorId),
      isOwnerSearchAvailable: () => true,
    }}
  >
    {children}
  </OperatorDashboardProvider>
);

export const OwnerOperatorDashboardProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => (
  <OperatorDashboardProvider
    value={{
      getOperatorEditUrl: () => urls.operators.operatorEdit(),
      isOperatorDeletable: () => false,
      getOperatorDeletedRedirectUrl: () => urls.operators.dashboard(),
      getServiceEditUrl: (operatorId, serviceId) =>
        urls.operators.service(operatorId, serviceId),
      getServiceCreateUrl: (operatorId, schemaId) =>
        urls.operators.servicesCreate(operatorId, schemaId),
      getServiceCreatedRedirectUrl: () => urls.operators.dashboard(),
      getServiceDeletedRedirectUrl: () => urls.operators.dashboard(),
      isOwnerSearchAvailable: () => false,
    }}
  >
    {children}
  </OperatorDashboardProvider>
);
