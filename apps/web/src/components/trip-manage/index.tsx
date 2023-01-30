import { TripNoId } from 'dtos';
import React, { useState } from 'react';
import { Button, CircularProgress, TextField, Typography, Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FetchStatus } from '../../models';
import { useRouter } from 'next/router';
import { urls } from '../../urls';
import { ImageDropzone } from '../image-dropzone';
import { DeleteConfirmModal } from '../modals/delete-confirm';

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
  const [description, setDescription] = useState(trip.description);
  const [photos, setPhotos] = useState(trip.photos);
  const [adultPrice, setAdultPrice] = useState(String(trip.adultPrice ?? 0));
  const [childPrice, setChildPrice] = useState(String(trip.childPrice ?? 0));

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
    <Box
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

      <TextField
        placeholder='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={isFetching}
        multiline
        rows={4}
      />

      <TextField
        placeholder='Adult Price'
        value={adultPrice}
        onChange={e => setAdultPrice(e.target.value)}
        disabled={isFetching}
      />

      <TextField
        placeholder='Child Price'
        value={childPrice}
        onChange={e => setChildPrice(e.target.value)}
        disabled={isFetching}
      />

      <Typography variant="h6">Photos</Typography>
      <ImageDropzone multiple onReceiveUrls={setPhotos}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {photos.map(photo => (
            <ImageListItem key={photo}>
              <img src={`${photo}?w=164&h=164&fit=crop&auto=format`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </ImageDropzone>

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
            description,
            photos,
            adultPrice: parseFloat(adultPrice),
            childPrice: parseFloat(childPrice),
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

      <DeleteConfirmModal
        title="Delete trip?"
        content="Are you sure you want to delete this trip?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteTrip}
        deleteStatus={deleteStatus}
      />
    </Box>
  )
}
