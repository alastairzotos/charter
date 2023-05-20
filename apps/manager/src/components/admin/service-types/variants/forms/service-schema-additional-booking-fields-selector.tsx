import { Button, FormLabel } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridCloseIcon } from "@mui/x-data-grid";
import { AdditionalBookingField } from "dtos";
import React from "react";
import { useIsDesktop } from "ui";

import { Surface } from "components/_core/surface";
import { createKey } from "util/misc";

interface Props {
  fields: AdditionalBookingField[];
  onChange: (fields: AdditionalBookingField[]) => void;
}

export const AdditionalBookingFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <Surface sx={{ p: 3 }}>
      <FormLabel>Additional booking fields</FormLabel>

      <DataGrid
        sx={{ mt: 2 }}
        columns={[
          {
            width: isDesktop ? 250 : 200,
            field: "title",
            headerName: "Title",
            editable: true,
            sortable: false,
            hideable: false,
          },
          {
            width: isDesktop ? 150 : 80,
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
              {
                value: "number",
                label: "Number",
              },
              {
                value: "boolean",
                label: "Yes/No",
              },
            ],
          },
          {
            width: 75,
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
                key: createKey(),
                type: "string",
                title: "New field",
              },
            ])
          }
        >
          Add booking field
        </Button>
      </div>
    </Surface>
  );
};
