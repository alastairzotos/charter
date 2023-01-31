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

import { Titled } from "src/components/titled";
import { pluralize } from "src/util/misc";

interface Props {
  title: string;
  bookings?: BookingDto[];
}

export const OperatorBookingList: React.FC<Props> = ({ title, bookings }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Titled title={title}>
        {bookings && bookings.length ? (
          <List>
            {bookings.map((booking) => (
              <ListItem key={booking._id}>
                <ListItemButton
                  component={Link}
                  href={urls.operators.booking(booking._id)}
                >
                  <ListItemText
                    primary={booking.trip.name}
                    secondary={`${booking.name} - ${booking.date} - ${
                      booking.adultGuests
                    } ${pluralize(booking.adultGuests, "adult")} - ${
                      booking.childGuests
                    } ${pluralize(booking.childGuests, {
                      singular: "child",
                      plural: "children",
                    })}`}
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
      </Titled>
    </Box>
  );
};
