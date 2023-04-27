import { Button, FormLabel, Paper } from "@mui/material";
import { AdditionalBookingField } from "dtos";
import React from "react";

import { DataGrid, GridActionsCellItem, GridCloseIcon } from "@mui/x-data-grid";

interface Props {
  fields: AdditionalBookingField[];
  onChange: (fields: AdditionalBookingField[]) => void;
}

export const AdditionalBookingFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>Additional booking fields</FormLabel>

      <DataGrid
        sx={{ mt: 2 }}
        columns={[
          {
            width: 200,
            field: "key",
            headerName: "Key",
            editable: true,
            sortable: false,
            hideable: false,
          },
          {
            width: 250,
            field: "title",
            headerName: "Title",
            editable: true,
            sortable: false,
            hideable: false,
          },
          {
            width: 150,
            field: "type",
            headerName: "Field type",
            type: "singleSelect",
            hideable: false,
            editable: true,
            sortable: false,
            valueOptions: [
              {
                value: "string",
                label: "String",
              },
            ],
          },
          {
            field: "delete",
            headerName: "Actions",
            type: "actions",
            sortable: false,
            hideable: false,
            getActions: (params) => {
              return [
                <GridActionsCellItem
                  icon={<GridCloseIcon />}
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
        processRowUpdate={(newRow, oldRow) => {
          onChange(
            fields.map((field) => (field.key === oldRow.key ? newRow : field))
          );

          return newRow;
        }}
        hideFooter
      />

      <div>
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() =>
            onChange([
              ...fields,
              {
                key: "key",
                type: "string",
                title: "New field",
              },
            ])
          }
        >
          Add booking field
        </Button>
      </div>
    </Paper>
  );
};
