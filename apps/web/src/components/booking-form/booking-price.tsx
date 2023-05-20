import InfoIcon from "@mui/icons-material/Info";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { BookingPriceDetails, ServiceNoId } from "dtos";
import React from "react";
import {
  calculateBookingFee,
  calculateBookingPrice,
  createPriceString,
} from "utils";

interface Props {
  priceDetails: BookingPriceDetails;
  service: ServiceNoId;
}

const BlueText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: "bold",
  marginRight: theme.spacing(1),
}));

export const BookingPrice: React.FC<Props> = ({ priceDetails, service }) => {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell component="th">
            {"Price"} <i>{"(all taxes and fees included)"}</i>{" "}
          </TableCell>
          <TableCell align="right">
            <Typography variant="caption">
              Fees
              <Tooltip
                disableFocusListener
                title={`VAT/GST/other similar taxes assessed on the booking fee, if applicable, are included`}
              >
                <InfoIcon sx={{ fontSize: 14, mb: -0.4, ml: 1, mr: 1 }} />
              </Tooltip>
              {createPriceString(calculateBookingFee(priceDetails, service))}
            </Typography>
            <Typography>
              <BlueText display="inline">Total:</BlueText>
              <Typography display="inline">
                {createPriceString(
                  calculateBookingPrice(priceDetails, service)
                )}
              </Typography>
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
