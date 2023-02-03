import { Avatar, ListItemAvatar } from "@mui/material";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  service: ServiceDto;
}

const DESC_LENGTH = 250;

export const UserServiceListItem: React.FC<Props> = ({ service }) => {
  const desc =
    service.description.length > DESC_LENGTH
      ? service.description.substring(0, DESC_LENGTH - 3) + "..."
      : service.description;

  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.user.service(service)}
    >
      <ListItemAvatar>
        <Avatar alt={service.name} src={service.photos[0]} />
      </ListItemAvatar>

      <ListItemText
        primary={`${service.name} - From €${service.adultPrice.toFixed(2)} per adult`}
        secondary={desc}
      />
    </ListItem>
  );
};
