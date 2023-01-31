import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { ManageTripForm } from "src/components/trip-manage";
import { useTripsState } from "src/state/trips";

interface Props {
  id: string;
  operatorId: string;
}

export const TripEdit: React.FC<Props> = ({ id, operatorId }) => {
  const [loadTripStatus, loadTrip, trip] = useTripsState((s) => [
    s.loadTripStatus,
    s.loadTrip,
    s.trip,
  ]);
  const [updateTripStatus, updateTrip] = useTripsState((s) => [
    s.updateTripStatus,
    s.updateTrip,
  ]);
  const [deleteTripStatus, deleteTrip] = useTripsState((s) => [
    s.deleteTripStatus,
    s.deleteTrip,
  ]);

  useEffect(() => {
    if (id) {
      loadTrip(id);
    }
  }, [id]);

  return (
    <Fetchable
      status={loadTripStatus}
      error={<Typography>There was an error loading the trip</Typography>}
    >
      <ManageTripForm
        title="Edit trip"
        operatorId={operatorId}
        trip={trip!}
        onSave={(newTrip) => updateTrip(id, newTrip)}
        saveStatus={updateTripStatus}
        onDelete={() => deleteTrip(id)}
        deleteStatus={deleteTripStatus}
      />
    </Fetchable>
  );
};
