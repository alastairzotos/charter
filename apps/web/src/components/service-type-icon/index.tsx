import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import SailingIcon from "@mui/icons-material/Sailing";
import { ServiceType } from "dtos";
import React from "react";

interface Props {
  serviceType: ServiceType;
}

const serviceTypeIcon: Record<ServiceType, React.ReactNode> = {
  none: null,
  "boat-rental": <HouseboatIcon />,
  "boat-trip": <SailingIcon />,
  sunbed: <BeachAccessIcon />,
};

export const ServiceTypeIcon: React.FC<Props> = ({ serviceType }) => (
  <>{serviceTypeIcon[serviceType]}</>
);
