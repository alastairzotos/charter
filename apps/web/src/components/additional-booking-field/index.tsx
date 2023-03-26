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
import { AdditionalBookingField, AdditionalBookingFieldType } from "dtos";
import React, { useId } from "react";

interface Props {
  field: AdditionalBookingField;
  onChange: (field: AdditionalBookingField) => void;
  onDelete: () => void;
}

export const ServiceSchemaAdditionalBookingField: React.FC<Props> = ({
  field,
  onChange,
  onDelete,
}) => {
  const labelId = useId();

  return (
    <Box sx={{ display: "flex", pt: 2, pb: 2 }} gap={1}>
      <TextField
        sx={{ width: 200 }}
        size="small"
        label="Key"
        value={field.key}
        onChange={(e) => onChange({ ...field, key: e.target.value })}
      />

      <TextField
        sx={{ width: 350 }}
        size="small"
        label="Title"
        value={field.title}
        onChange={(e) => onChange({ ...field, title: e.target.value })}
      />

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={labelId}>Field type</InputLabel>
        <Select
          size="small"
          labelId={labelId}
          label="Field type"
          value={field.type}
          onChange={(e) =>
            onChange({
              ...field,
              type: e.target.value as AdditionalBookingFieldType,
            })
          }
        >
          <MenuItem value="string">String</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
