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
import { PriceTierDto } from "dtos";
import React from "react";

import { PriceFormProps } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/price-forms/props";

export const TieredPriceForm: React.FC<PriceFormProps> = ({
  pricing,
  setPricing,
}) => {
  const tiers = pricing?.tiered?.tiers || [];

  const setTiers = (tiers: PriceTierDto[]) =>
    setPricing({ ...pricing, tiered: { tiers } });

  const addTier = () => {
    const tiersStartingWithNewTier = tiers.filter((tier) =>
      tier.name.startsWith("New tier")
    );
    const lastNewTierNumber =
      tiersStartingWithNewTier.length > 0
        ? parseInt(
            tiersStartingWithNewTier.pop()?.name.split(" ").pop() || "0",
            10
          ) + 1
        : 1;

    setTiers([
      ...tiers,
      {
        name: "New tier " + lastNewTierNumber,
        rate: 10,
      },
    ]);
  };

  const renameTier = (index: number, newName: string) => {
    if (!tiers.find((tier) => tier.name === newName)) {
      setTiers(
        tiers.map((tier, i) =>
          i === index ? { ...tier, name: newName } : tier
        )
      );
    }
  };

  const setTierPrice = (index: number, price: number) =>
    setTiers(
      tiers.map((tier, i) => (i === index ? { ...tier, rate: price } : tier))
    );

  const removeTier = (index: number) =>
    setTiers(tiers.filter((_, i) => i !== index));

  return (
    <Paper
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      variant="outlined"
    >
      <Box sx={{ m: 2 }}>
        <Typography variant="subtitle2">Price tiers</Typography>

        {tiers.map(({ name, rate }, index) => (
          <Box
            key={index}
            sx={{ width: "100%", display: "flex", mt: 2, gap: 1 }}
          >
            <TextField
              label="Tier name"
              value={name}
              onChange={(e) => renameTier(index, e.currentTarget.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Price"
              type="number"
              value={rate}
              onChange={(e) =>
                setTierPrice(index, parseFloat(e.currentTarget.value))
              }
              sx={{ flexGrow: 0 }}
            />
            <div>
              <IconButton onClick={() => removeTier(index)}>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
        ))}

        <Button onClick={addTier} variant="outlined" sx={{ width: 200, mt: 2 }}>
          <AddIcon /> Add price tier
        </Button>
      </Box>
    </Paper>
  );
};
