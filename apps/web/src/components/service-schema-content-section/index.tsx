import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ServiceSchemaContentSectionDto,
  ServiceSchemaContentSectionType,
} from "dtos";
import React, { useId } from "react";

import { SETTINGS_WIDTH } from "src/util/misc";

interface Props {
  section: ServiceSchemaContentSectionDto;
  onChange: (section: ServiceSchemaContentSectionDto) => void;
  onDelete: () => void;
}

export const ServiceSchemaContentSection: React.FC<Props> = ({
  section,
  onChange,
  onDelete,
}) => {
  const labelId = useId();

  return (
    <Box sx={{ display: "flex", pt: 2, pb: 2 }} gap={1}>
      <TextField
        sx={{ width: 300 }}
        size="small"
        label="Key"
        value={section.key}
        onChange={(e) => onChange({ ...section, key: e.target.value })}
      />

      <TextField
        sx={{ width: SETTINGS_WIDTH }}
        size="small"
        label="Title"
        value={section.title}
        onChange={(e) => onChange({ ...section, title: e.target.value })}
      />

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={labelId}>Section type</InputLabel>
        <Select
          size="small"
          labelId={labelId}
          label="Field type"
          value={section.type}
          onChange={(e) =>
            onChange({
              ...section,
              type: e.target.value as ServiceSchemaContentSectionType,
            })
          }
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="bullets">Bulletpoints</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
