import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { BookingDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { Titled } from "components/titled";

interface Props {
  bookings?: BookingDto[];
}

export const OperatorBookingList: React.FC<Props> = ({ bookings }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {bookings && bookings.length ? (
        <List dense>
          {bookings
            .slice()
            .reverse()
            .map((booking) => (
              <ListItem key={booking._id}>
                <ListItemButton
                  component={Link}
                  href={urls.operators.booking(booking._id)}
                >
                  <ListItemText
                    primary={booking.service?.name || "<Unknown service>"}
                    secondary={booking.date}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      ) : (
        <Typography color="text.secondary">
          There are no bookings in this list
        </Typography>
      )}
    </Box>
  );
};
