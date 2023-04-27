import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
  Slider,
  FormLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { AgeCohortPrice } from "dtos";
import React from "react";

import { PriceFormProps } from "components/operator/dashboard/services/price-forms/props";

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
            sx={{ width: "100%", display: "flex", mt: 2, gap: 3 }}
          >
            <TextField
              label="Name"
              size="small"
              value={cohort.name}
              onChange={(e) => renameCohort(index, e.currentTarget.value)}
              sx={{ flexGrow: 1 }}
            />
            <Box sx={{ minWidth: 300, maxWidth: 300 }}>
              <FormLabel sx={{ fontSize: "0.8em" }}>Age range</FormLabel>
              <Slider
                valueLabelDisplay="auto"
                size="small"
                value={[cohort.fromAge, cohort.toAge]}
                sx={{ maxWidth: 300 }}
                min={0}
                max={100}
                onChange={(_, value: number | number[]) => {
                  const [fromAge, toAge] = value as number[];
                  updateCohort(index, { fromAge, toAge });
                }}
              />
            </Box>
            <TextField
              label="Price"
              type="number"
              size="small"
              value={cohort.price}
              inputProps={{ min: 1 }}
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
