import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
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

const DESC_LENGTH = 100;

export const UserServiceListItem: React.FC<Props> = ({
  service,
  showOperator = false,
}) => {
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
        {service.photos && service.photos.length > 0 ? (
          <Avatar alt={service.name} src={service.photos[0]} />
        ) : (
          <Avatar sx={{ bgcolor: blue[500] }}>
            <BeachAccessIcon />
          </Avatar>
        )}
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography>
            {service.name}
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
