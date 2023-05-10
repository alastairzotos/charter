import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridCloseIcon } from "@mui/x-data-grid";
import { ServiceSchemaContentSectionDto } from "dtos";
import React from "react";
import { useIsDesktop } from "ui";

import { createKey } from "util/misc";

interface Props {
  sections: ServiceSchemaContentSectionDto[];
  onChange: (sections: ServiceSchemaContentSectionDto[]) => void;
}

export const ServiceSchemaContentSectionsSelector: React.FC<Props> = ({
  sections,
  onChange,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <DataGrid
        columns={[
          {
            width: isDesktop ? 250 : 250,
            field: "title",
            headerName: "Title",
            editable: true,
            sortable: false,
            hideable: false,
          },
          {
            width: isDesktop ? 150 : 100,
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
                key: createKey(),
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
