import { Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Day,
  defaultOpeningDayTime,
  OpeningHoursDto,
  OpeningTimesDto,
} from "dtos";
import React from "react";
import { useIsDesktop } from "ui";

import { TimeEditor } from "components/operator/_core/opening-times-form/time-editor";

interface Props {
  openingTimes: Record<Day, OpeningHoursDto>;
  setOpeningTimes: (openingTimes: OpeningTimesDto) => void;
}

export const OpeningTimesForm: React.FC<Props> = ({
  openingTimes,
  setOpeningTimes,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <DataGrid
      columns={[
        {
          width: isDesktop ? 180 : 30,
          field: "day",
          headerName: "Day",
          editable: false,
          sortable: false,
          hideable: false,
        },
        {
          width: isDesktop ? 180 : 100,
          field: "openingTime",
          headerName: "Opening Time",
          sortable: false,
          hideable: false,
          editable: true,
          valueGetter: (params) =>
            params.row.allDay || params.row.closed
              ? "-"
              : params.row.openingTime || defaultOpeningDayTime.openingTime,
          renderEditCell: (params) => <TimeEditor {...params} />,
        },
        {
          width: isDesktop ? 180 : 100,
          field: "closingTime",
          headerName: "Closing Time",
          sortable: false,
          hideable: false,
          editable: true,
          valueGetter: (params) =>
            params.row.allDay || params.row.closed
              ? "-"
              : params.row.closingTime || defaultOpeningDayTime.closingTime,
          renderEditCell: (params) => <TimeEditor {...params} />,
        },
        {
          width: 75,
          field: "allDay",
          headerName: "All day",
          sortable: false,
          hideable: false,
          renderCell: (params) => (
            <Checkbox
              checked={params.row.allDay}
              disabled={params.row.closed}
              onChange={(e) =>
                setOpeningTimes({
                  ...openingTimes,
                  [params.row.day]: {
                    ...openingTimes[params.row.day as Day],
                    allDay: e.target.checked,
                  },
                })
              }
            />
          ),
        },
        {
          width: 75,
          field: "closed",
          headerName: "Closed",
          sortable: false,
          hideable: false,
          renderCell: (params) => (
            <Checkbox
              checked={params.row.closed}
              onChange={(e) =>
                setOpeningTimes({
                  ...openingTimes,
                  [params.row.day]: {
                    ...openingTimes[params.row.day as Day],
                    closed: e.target.checked,
                  },
                })
              }
            />
          ),
        },
      ]}
      rows={Object.entries(openingTimes).map(([day, times]) => ({
        day,
        ...times,
      }))}
      getRowId={(row) => row.day}
      processRowUpdate={(newRow) => {
        const { day, ...updatedDay } = newRow; // eslint-disable-line @typescript-eslint/no-unused-vars

        setOpeningTimes({
          ...openingTimes,
          [newRow.day]: updatedDay,
        });

        return newRow;
      }}
      isCellEditable={(params) =>
        params.field === "closed" || (!params.row.allDay && !params.row.closed)
      }
      hideFooter
    />
  );
};
