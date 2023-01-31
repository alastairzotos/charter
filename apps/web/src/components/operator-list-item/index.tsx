import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { OperatorDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  operator: OperatorDto;
}

export const OperatorListItem: React.FC<Props> = ({ operator }) => {
  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.admin.operator(operator._id)}
    >
      <ListItemAvatar>
        <Avatar alt={operator.name} src={operator.photo} />
      </ListItemAvatar>

      <ListItemText
        primary={operator.name}
        secondary={<>{operator.address}</>}
      />
    </ListItem>
  );
};
