import { OperatorDto } from "dtos";
import React from "react";

export interface OperatorDashboardUrls {
  getOperatorEditUrl: (operator: OperatorDto) => string;
  isOperatorDeletable: () => boolean;
  getOperatorDeletedRedirectUrl: () => string;
  getServiceEditUrl: (operatorId: string, serviceId: string) => string;
  getServiceCreateUrl: (operatorId: string, schemaId: string) => string;
  getServiceCreatedRedirectUrl: (operatorId: string) => string;
  getServiceDeletedRedirectUrl: (operatorId: string) => string;
  isOwnerSearchAvailable: () => boolean;
}

const OperatorDashboardContext = React.createContext<OperatorDashboardUrls>({
  getOperatorEditUrl: () => "",
  isOperatorDeletable: () => false,
  getOperatorDeletedRedirectUrl: () => "",
  getServiceEditUrl: () => "",
  getServiceCreateUrl: () => "",
  getServiceCreatedRedirectUrl: () => "",
  getServiceDeletedRedirectUrl: () => "",
  isOwnerSearchAvailable: () => false,
});

export const OperatorDashboardProvider = OperatorDashboardContext.Provider;

export const useOperatorDashboard = () =>
  React.useContext(OperatorDashboardContext);
