import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  service: ServiceDto;
  showOperator?: boolean;
}

const DESC_LENGTH = 250;

export const UserServiceListItem: React.FC<Props> = ({
  service,
  showOperator = false,
}) => {
  const desc =
    service.description.length > DESC_LENGTH
      ? service.description.substring(0, DESC_LENGTH - 3) + "..."
      : service.description;

  const primaryText = `${service.name} - From €${service.adultPrice.toFixed(
    2
  )} per adult`;

  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.user.service(service)}
    >
      {service.photos && service.photos.length > 0 && (
        <ListItemAvatar>
          <Avatar alt={service.name} src={service.photos[0]} />
        </ListItemAvatar>
      )}

      <ListItemText
        primary={
          <Typography>
            {primaryText}
            {showOperator && (
              <>
                <Avatar
                  src={service.operator.photo}
                  sx={{
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    ml: 1,
                    mr: 1,
                  }}
                />
                <Link
                  href={urls.user.operator(service.operator)}
                  style={{ textDecoration: "none" }}
                >
                  {service.operator.name}
                </Link>
              </>
            )}
          </Typography>
        }
        secondary={desc}
      />
    </ListItem>
  );
};
