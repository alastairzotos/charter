import { Avatar, Chip } from "@mui/material";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  service: ServiceDto;
}

export const ServiceChip: React.FC<Props> = ({ service }) => {
  return (
    <Link target="_blank" href={urls.user.service(service)}>
      <Chip
        label={service.name}
        sx={{ cursor: "pointer" }}
        variant="filled"
        color="primary"
        avatar={<Avatar src={service.photos[0] || ""} alt={service.name} />}
      />
    </Link>
  );
};
