import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import { OperatorDto, ServiceDto } from "dtos";
import React from "react";

export interface OptionType {
  type: "operator" | "service";
  operator?: OperatorDto;
  service?: ServiceDto;
}

interface Props {
  props: React.HTMLAttributes<HTMLLIElement>;
  option: OptionType;
}

const IMAGE_SIZE = 30;

export const SearchResult: React.FC<Props> = ({ props, option }) => {
  const srcUrl =
    option.type === "operator"
      ? option.operator?.photo
      : option.service?.photos[0];

  const label =
    option.type === "operator"
      ? option.operator?.name
      : `${option.service?.name} by ${option.service?.operator.name}`;

  return (
    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
      {srcUrl ? (
        <img loading="lazy" width={`${IMAGE_SIZE}`} src={srcUrl} alt={label} />
      ) : (
        <Avatar
          variant="square"
          sx={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            mr: 2,
            bgcolor: blue[500],
          }}
        >
          <BeachAccessIcon sx={{ fontSize: IMAGE_SIZE }} />
        </Avatar>
      )}

      {label}
    </Box>
  );
};
