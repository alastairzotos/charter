import React, { useEffect, useState } from 'react';
import { OperatorDto, TripDto } from 'dtos';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useUserState } from '../../state/user';
import { createBookingsState, useBookingsState } from '../../state/bookings';
import { useRouter } from 'next/router';
import { urls } from '../../urls';

const bookingModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

interface Props {
  operator: OperatorDto;
  trip: TripDto;

  onClose: () => void;
}

export const BookingForm: React.FC<Props> = ({ operator, trip, onClose }) => {
  const router = useRouter();

  const [createBookingStatus, createBooking, bookingId] = useBookingsState(s => [s.createBookingStatus, s.createBooking, s.bookingId]);

  const loggedinUser = useUserState(s => s.loggedInUser);
  const [name, setName] = useState(loggedinUser?.givenName || '');
  const [email, setEmail] = useState(loggedinUser?.email || '');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (!!bookingId) {
      router.push(urls.user.booking(bookingId));
    }
  }, [bookingId]);

  const isValid = name.trim().length && email.trim().length && guests > 0 && !!date && date.isValid();

  const handleBookClick = () => {
    createBooking({
      operator,
      trip,
      name,
      email,
      date: date!.toString(),
      guests,
      status: 'pending'
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={bookingModalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Book {trip.name} by {operator.name}</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 3,
            mb: 3,
          }}
        >
          <TextField
            label="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            label="Your email address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <MobileDatePicker
            label="Date"
            inputFormat="DD/MM/YYYY"
            minDate={dayjs().add(1, 'day')}
            value={date}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            type="number"
            InputProps={{
              inputProps: {
                max: 10, min: 1
              }
            }}
            label="Number of guests"
            value={guests}
            onChange={e => setGuests(parseInt(e.target.value, 10))}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color="success"
            variant="contained"
            disabled={!isValid || createBookingStatus === 'fetching'}
            onClick={handleBookClick}
          >
            Book now
          </Button>
        </Box>

        {createBookingStatus === 'error' && <Typography>There was an error creating your booking. Please try again later.</Typography>}
      </Box>
    </LocalizationProvider>
  )
}
