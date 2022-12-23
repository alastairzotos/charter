import React from 'react';
import { OperatorDto, TripDto } from 'dtos';
import Link from 'next/link';
import { urls } from '../../urls';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ImageGallery from 'react-image-gallery';

interface Props {
  trip: TripDto;
  operator: OperatorDto;
}

export const UserTripView: React.FC<Props> = ({ trip, operator }) => {
  return (
    <>
      <Button
        component={Link}
        href={urls.user.operator(operator)}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
        Back to trips
      </Button>

      <Typography variant="h6">{trip.name}</Typography>

      <Typography sx={{ mt: 2, mb: 2 }}>{trip.description}</Typography>

      <Typography color="text.secondary"><strong>Start location</strong>: {trip.startLocation}</Typography>
      <Typography color="text.secondary"><strong>Start time</strong>: {trip.startTime}</Typography>
      <Typography color="text.secondary"><strong>Duration</strong>: {trip.duration}</Typography>

      <Box sx={{ mt: 3 }}>
        <ImageGallery
          items={
            trip.photos.map(photo => ({
              original: photo,
              thumbnail: photo,
              thumbnailHeight: 100,
              originalHeight: 500
            }))
          }
        />
      </Box>
    </>
  )
}
