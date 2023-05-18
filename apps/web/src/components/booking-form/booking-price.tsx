import InfoIcon from "@mui/icons-material/Info";
import { Table, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { BookingPriceDetails, ServiceNoId } from "dtos";
import React from "react";
import {
  BOOKING_FEE_PERCENTAGE,
  calculateBookingPrice,
  createPriceString,
} from "utils";

interface Props {
  priceDetails: BookingPriceDetails;
  service: ServiceNoId;
}

export const BookingPrice: React.FC<Props> = ({ priceDetails, service }) => {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell component="th">
            {"Total Price"} <i>{"(all taxes and fees included)"}</i>{" "}
            <Tooltip
              disableFocusListener
              title={`We add a ${BOOKING_FEE_PERCENTAGE}% fee to cover payment processing`}
            >
              <InfoIcon sx={{ fontSize: 16, mb: -0.4 }} />
            </Tooltip>
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: "bold" }}>
            {createPriceString(calculateBookingPrice(priceDetails, service))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
