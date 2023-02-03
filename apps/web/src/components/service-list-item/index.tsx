import { Avatar, ListItemAvatar } from "@mui/material";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { getServiceTypeLabel, ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { shortenText } from "src/util/misc";

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
      {service.photos && service.photos.length > 0 && (
        <ListItemAvatar>
          <Avatar alt={service.name} src={service.photos[0]} />
        </ListItemAvatar>
      )}

      <ListItemText
        primary={
          <>
            <strong>[{getServiceTypeLabel(service.type)}]</strong>{" "}
            {service.name}
          </>
        }
        secondary={<>{shortenText(service.description, 150)}</>}
      />
    </ListItem>
  );
};
