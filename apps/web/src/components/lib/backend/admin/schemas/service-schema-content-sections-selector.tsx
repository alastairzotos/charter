import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridCloseIcon } from "@mui/x-data-grid";
import { ServiceSchemaContentSectionDto } from "dtos";
import React from "react";

interface Props {
  sections: ServiceSchemaContentSectionDto[];
  onChange: (sections: ServiceSchemaContentSectionDto[]) => void;
}

export const ServiceSchemaContentSectionsSelector: React.FC<Props> = ({
  sections,
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
                value: "text",
                label: "Text",
              },
              {
                value: "bullets",
                label: "Bulletpoints",
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
                    onChange(
                      sections.filter((section) => section.key !== params.id)
                    )
                  }
                />,
              ];
            },
          },
        ]}
        rows={sections}
        getRowId={(row) => row.key}
        processRowUpdate={(newRow, oldRow) => {
          onChange(
            sections.map((section) =>
              section.key === oldRow.key ? newRow : section
            )
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
              ...sections,
              {
                key: "key",
                type: "text",
                title: "New section",
              },
            ])
          }
        >
          Add content section
        </Button>
      </div>
    </>
  );
};
