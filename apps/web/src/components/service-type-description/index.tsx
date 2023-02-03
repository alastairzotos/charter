import { ServiceType } from "dtos";
import React from "react";

interface Props {
  serviceType: ServiceType;
}

export const serviceTypeDescription: Record<ServiceType, string> = {
  none: "",
  "boat-rental":
    "Rent boats at cheap prices to explore the seas at your leisure",
  "boat-trip": "Take a guided trip on a boat around the island",
  sunbed:
    "Reserve a sunbed and beathe easy knowing you'll have one waiting for you",
};

export const ServiceTypeDescription: React.FC<Props> = ({ serviceType }) => (
  <>{serviceTypeDescription[serviceType]}</>
);
