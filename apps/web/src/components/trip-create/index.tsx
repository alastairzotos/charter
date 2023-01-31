import { TripNoId } from "dtos";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { ManageTripForm } from "src/components/trip-manage";
import { useTripsState } from "src/state/trips";

interface Props {
  operatorId: string;
}

export const TripCreate: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();
  const [createTripStatus, createTrip] = useTripsState((s) => [
    s.createTripStatus,
    s.createTrip,
  ]);

  const handleCreateTrip = async (trip: TripNoId) => {
    await createTrip(trip);
    router.push(urls.admin.operator(operatorId));
  };

  return (
    <ManageTripForm
      title="Create trip"
      operatorId={operatorId}
      trip={{
        name: "",
        duration: "",
        startLocation: "",
        startTime: "",
        description: "",
        photos: [],
        adultPrice: 0,
        childPrice: 0,
        operator: operatorId as any, // This will be cast as an ObjectId in the backend
      }}
      onSave={handleCreateTrip}
      saveStatus={createTripStatus}
    />
  );
};
