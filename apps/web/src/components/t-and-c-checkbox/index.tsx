import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

interface Props {
  accepted: boolean;
  setAccepted: (accepted: boolean) => void;
}

export const TAndCCheckbox: React.FC<Props> = ({ accepted, setAccepted }) => {
  return (
    <FormControlLabel
      label={
        <Typography fontSize="small" color="GrayText">
          I accept the{" "}
          <Link
            href={urls.user.terms()}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            terms and conditions <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Typography>
      }
      control={
        <Checkbox
          checked={accepted}
          onChange={(e) => setAccepted(e.currentTarget.checked)}
        />
      }
    />
  );
};
