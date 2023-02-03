import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  operatorId: string;
  service: ServiceDto;
}

export const ServiceListItem: React.FC<Props> = ({ operatorId, service }) => {
  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.admin.service(operatorId, service._id)}
    >
      <ListItemText
        primary={service.name}
        secondary={
          <>
            {service.startLocation} - {service.startTime}
          </>
        }
      />
    </ListItem>
  );
};
