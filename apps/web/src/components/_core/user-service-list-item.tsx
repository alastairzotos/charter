import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
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
    <Link href={urls.user.service(service)} style={{ textDecoration: "none" }}>
      <Card>
        <CardMedia
          title={service.name}
          // TODO: Get this in an env var
          image={
            service.photos && service.photos.length > 0
              ? service.photos[0]
              : "https://d3tr1qr2feu6jb.cloudfront.net/4598e612-f6c9-4a42-9676-836626862a82"
          }
          sx={{ height: 180 }}
        />
        <CardHeader title={service.name} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1" color="text.secondary">
            {desc}
          </Typography>

          {showOperator && (
            <CardActions sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Avatar
                src={service.operator.photo}
                sx={{
                  width: 25,
                  height: 25,
                  mr: 1,
                }}
              />
              {/* <Typography variant="body2" color="text.secondary">
                {service.operator.name}
              </Typography> */}
            </CardActions>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
