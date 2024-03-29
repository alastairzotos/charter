import { SxProps, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

interface Props {
  sx?: SxProps;
  kv: Record<string, React.ReactNode>;
}

export const KeyValues: React.FC<Props> = ({ sx, kv }) => {
  return (
    <Table sx={sx} size="small">
      <TableBody>
        {Object.keys(kv).map((key) => (
          <TableRow key={key}>
            <TableCell component="th">{key}</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {kv[key]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
