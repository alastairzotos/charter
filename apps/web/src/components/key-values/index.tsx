import { SxProps, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

interface Props {
  sx?: SxProps;
  kv: Record<string, string>;
}

export const KeyValues: React.FC<Props> = ({ sx, kv }) => {
  return (
    <Table sx={sx} size="small">
      <TableBody>
        {Object.keys(kv).map((key) => (
          <TableRow key={key}>
            <TableCell component="th" sx={{ fontWeight: "bold" }}>
              {key}
            </TableCell>
            <TableCell align="right">{kv[key]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
