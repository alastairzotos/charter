import { TripNoId } from 'dtos';
import React, { useState } from 'react';
import { Button, CircularProgress, Paper, TextField, Typography, Box } from '@mui/material';
import { FetchStatus } from '../../models';
import { DeleteTripModal } from './delete-modal';
import { useRouter } from 'next/router';
import { urls } from '../../urls';

interface Props {
  operatorId: string;
  title: string;

  id?: string;
  trip: TripNoId;
  onSave: (trip: TripNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageTripForm: React.FC<Props> = ({ operatorId, title, id, trip, onSave, saveStatus, onDelete, deleteStatus }) => {
  const router = useRouter();

  const [name, setName] = useState(trip.name);
  const [duration, setDuration] = useState(trip.duration);
  const [startLocation, setStartLocation] = useState(trip.startLocation);
  const [startTime, setStartTime] = useState(trip.startTime);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isValid = name.trim().length > 0 && duration.trim().length > 0 && startLocation.trim().length > 0 && startTime.trim().length > 0;

  const isFetching = saveStatus === 'fetching' || deleteStatus === 'fetching';

  const handleDeleteTrip = async () => {
    if (!!onDelete) {
      await onDelete();
      router.push(urls.admin.operator(operatorId));
    }
  }

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h4">{title}</Typography>

      <TextField
        placeholder='Trip name'
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Trip duration'
        value={duration}
        onChange={e => setDuration(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Starting location'
        value={startLocation}
        onChange={e => setStartLocation(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Start time'
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        disabled={isFetching}
      />

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          variant="contained"
          disabled={!isValid || isFetching}
          sx={{ maxWidth: '20%' }}
          onClick={() => onSave({
            name,
            duration,
            startLocation,
            startTime,
            operator: operatorId as any
          })}
        >
          {saveStatus === 'fetching' ? <CircularProgress size={20} /> : 'Save'}
        </Button>

        {!!onDelete && (
          <Button
            disabled={isFetching}
            color="warning"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        )}
      </Box>

      {saveStatus === 'error' && <Typography>There was an error saving the trip data</Typography>}

      <DeleteTripModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteTrip}
        deleteStatus={deleteStatus}
      />
    </Paper>
  )
}
