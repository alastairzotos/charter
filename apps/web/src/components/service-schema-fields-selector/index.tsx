import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

interface Props {
  fields: ServiceSchemaFieldDto[];
  onChange: (fields: ServiceSchemaFieldDto[]) => void;
}

export const ServiceSchemaFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  return (
    <>
      <DataGrid
        columns={[
          {
            width: 200,
            field: "key",
            headerName: "Key",
            editable: true,
          },
          {
            width: 250,
            field: "label",
            headerName: "Label",
            editable: true,
          },
          {
            width: 150,
            field: "type",
            headerName: "Field type",
            type: "singleSelect",
            editable: true,
            valueOptions: [
              {
                value: "string",
                label: "String",
              },
              {
                value: "multiline-text",
                label: "Multiline Text",
              },
              {
                value: "time",
                label: "Time",
              },
              {
                value: "timeframe",
                label: "Timeframe",
              },
            ],
          },
          {
            field: "delete",
            headerName: "Actions",
            type: "actions",
            getActions: (params) => {
              return [
                <GridActionsCellItem
                  icon={<CloseIcon />}
                  label="Delete"
                  onClick={() =>
                    onChange(fields.filter((field) => field.key !== params.id))
                  }
                />,
              ];
            },
          },
        ]}
        rows={fields}
        getRowId={(row) => row.key}
        processRowUpdate={(newRow) => {
          onChange(
            fields.map((field) => (field.key === newRow.key ? newRow : field))
          );

          return newRow;
        }}
        hideFooter
      />

      <div>
        <Button
          variant="outlined"
          onClick={() =>
            onChange([
              ...fields,
              {
                key: "key",
                label: "New field",
                type: "string",
              },
            ])
          }
        >
          Add field
        </Button>
      </div>
    </>
  );
};
