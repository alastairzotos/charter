import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { AgeCohortPrice } from "dtos";
import React from "react";

import { PriceFormProps } from "src/components/price-forms/props";

export const PerAgeCohortPriceForm: React.FC<PriceFormProps> = ({
  pricing,
  setPricing,
}) => {
  const cohorts = pricing.perAgeCohort?.ageCohorts || [];

  const setAgeCohorts = (ageCohorts: AgeCohortPrice[]) =>
    setPricing({ ...pricing, perAgeCohort: { ageCohorts } });

  const addAgeCohort = () => {
    const cohortsStartingWithNewAgeCohort = cohorts.filter((cohort) =>
      cohort.name.startsWith("Cohort")
    );
    const lastNewAgeCohortNumber =
      cohortsStartingWithNewAgeCohort.length > 0
        ? parseInt(
            cohortsStartingWithNewAgeCohort.pop()?.name.split(" ").pop() || "0",
            10
          ) + 1
        : 1;

    setAgeCohorts([
      ...cohorts,
      {
        name: "Cohort " + lastNewAgeCohortNumber,
        fromAge: 1,
        toAge: 10,
        price: 10,
      },
    ]);
  };

  const renameCohort = (index: number, newName: string) => {
    if (!cohorts.find((cohort) => cohort.name === newName)) {
      setAgeCohorts(
        cohorts.map((cohort, i) =>
          i === index ? { ...cohort, name: newName } : cohort
        )
      );
    }
  };

  const updateCohort = (index: number, updated: Partial<AgeCohortPrice>) =>
    setAgeCohorts(
      cohorts.map((cohort, i) =>
        i === index ? { ...cohort, ...updated } : cohort
      )
    );

  const removegeCohort = (index: number) =>
    setAgeCohorts(cohorts.filter((_, i) => i !== index));

  return (
    <Paper
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      variant="outlined"
    >
      <Box sx={{ m: 2 }}>
        <Typography variant="subtitle2">Age cohorts</Typography>

        {cohorts.map((cohort, index) => (
          <Box
            key={index}
            sx={{ width: "100%", display: "flex", mt: 2, gap: 1 }}
          >
            <TextField
              label="Name"
              value={cohort.name}
              onChange={(e) => renameCohort(index, e.currentTarget.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="From age"
              type="number"
              value={cohort.fromAge}
              onChange={(e) =>
                updateCohort(index, {
                  fromAge: parseInt(e.currentTarget.value, 10),
                })
              }
              sx={{ flexGrow: 0 }}
            />
            <TextField
              label="To age"
              type="number"
              value={cohort.toAge}
              onChange={(e) =>
                updateCohort(index, {
                  toAge: parseInt(e.currentTarget.value, 10),
                })
              }
              sx={{ flexGrow: 0 }}
            />
            <TextField
              label="Price"
              type="number"
              value={cohort.price}
              onChange={(e) =>
                updateCohort(index, {
                  price: parseFloat(e.currentTarget.value),
                })
              }
              sx={{ flexGrow: 0 }}
            />
            <div>
              <IconButton onClick={() => removegeCohort(index)}>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
        ))}

        <Button
          onClick={addAgeCohort}
          variant="outlined"
          sx={{ width: 200, mt: 2 }}
        >
          <AddIcon /> Add age cohort
        </Button>
      </Box>
    </Paper>
  );
};
