import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, ListItemAvatar, Tooltip, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";

import { useOperatorDashboard } from "contexts/operator-dashboard";
import { shortenText } from "util/misc";

interface Props {
  service: ServiceDto;
}

const hasValidSchema = (service: ServiceDto) =>
  !!service.serviceSchema && !!service.serviceSchema.schemaCategory;

export const ServiceListItem: React.FC<Props> = ({ service }) => {
  const { getServiceEditUrl } = useOperatorDashboard();

  return (
    <ListItem
      sx={{
        backgroundColor:
          service.hidden || !hasValidSchema(service) ? "lightgray" : "none",
      }}
      alignItems="flex-start"
      component={Link}
      href={getServiceEditUrl(
        typeof service.operator === "string"
          ? service.operator
          : service.operator._id,
        service._id
      )}
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
          <>
            {hasValidSchema(service) && (
              <strong>
                [{service.serviceSchema.schemaCategory?.name}] [
                {service.serviceSchema.name}]
              </strong>
            )}
            {!hasValidSchema(service) && (
              <strong>
                {"[DELETED SCHEMA"}
                <Tooltip title="This service won't appear to users because its schema has been deleted">
                  <InfoIcon
                    sx={{ fontSize: "0.8em", color: "GrayText", ml: 1 }}
                  />
                </Tooltip>
                {"]"}
              </strong>
            )}{" "}
            {service.name}
            {service.hidden && (
              <Typography sx={{ ml: 2 }} variant="overline">
                (Hidden from users)
              </Typography>
            )}
          </>
        }
        secondary={<>{shortenText(service.description, 150)}</>}
      />
    </ListItem>
  );
};
