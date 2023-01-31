import { Button, List, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { Fetchable } from "src/components/fetchable";
import { TripListItem } from "src/components/trip-list-item";
import { useTripsState } from "src/state/trips";

interface Props {
  operatorId: string;
}

export const TripList: React.FC<Props> = ({ operatorId }) => {
  const [loadTripsStatus, loadTripsForOperator, trips] = useTripsState((s) => [
    s.loadTripsStatus,
    s.loadTripsForOperator,
    s.trips,
  ]);

  useEffect(() => {
    if (operatorId) {
      loadTripsForOperator(operatorId);
    }
  }, [operatorId]);

  return (
    <Fetchable
      status={loadTripsStatus}
      error={
        <Typography>
          There was an error loading the operator&apos;s trips
        </Typography>
      }
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {trips.map((trip) => (
          <TripListItem key={trip._id} operatorId={operatorId} trip={trip} />
        ))}
      </List>

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.tripsCreate(operatorId)}
        sx={{ mt: 3 }}
      >
        Add trip
      </Button>
    </Fetchable>
  );
};
