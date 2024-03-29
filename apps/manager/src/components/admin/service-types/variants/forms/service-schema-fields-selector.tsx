import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { ServiceSchemaFieldDto } from "dtos";
import React from "react";
import { useIsDesktop } from "ui";

import { createKey } from "util/misc";

interface Props {
  fields: ServiceSchemaFieldDto[];
  onChange: (fields: ServiceSchemaFieldDto[]) => void;
}

export const ServiceSchemaFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <DataGrid
        columns={[
          {
            width: isDesktop ? 250 : 150,
            field: "label",
            headerName: "Label",
            editable: true,
            sortable: false,
            hideable: false,
          },
          {
            width: isDesktop ? 250 : 150,
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
            width: 75,
            field: "delete",
            headerName: "Actions",
            type: "actions",
            sortable: false,
            hideable: false,
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
          variant="outlined"
          onClick={() =>
            onChange([
              ...fields,
              {
                key: createKey(),
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
