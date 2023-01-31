import { List } from "@mui/material";
import { TripDto } from "dtos";
import React from "react";

import { Titled } from "src/components/titled";
import { UserTripListItem } from "src/components/user-trip-list-item";

interface Props {
  trips: TripDto[];
}

export const UserTripsView: React.FC<Props> = ({ trips }) => {
  return (
    <Titled title="Trips">
      <List sx={{ width: "100%" }}>
        {trips.map((trip) => (
          <UserTripListItem key={trip._id} trip={trip} />
        ))}
      </List>
    </Titled>
  );
};
