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
import React from "react";

import { PriceFormProps } from "src/components/price-forms/props";

export const TieredPriceForm: React.FC<PriceFormProps> = ({
  pricing,
  setPricing,
}) => {
  const tiers = pricing.tiered?.tiers || {};

  const setTiers = (tiers: Record<string, number>) =>
    setPricing({ ...pricing, tiered: { tiers } });

  const addTier = () => setTiers({ ...tiers, "New tier": 10 });

  const renameTier = (oldName: string, newName: string) => {
    const newTiers = { ...tiers };
    newTiers[newName] = tiers[oldName];
    delete newTiers[oldName];
    setTiers(newTiers);
  };

  const setTierPrice = (tierName: string, price: number) =>
    setTiers({ ...tiers, [tierName]: price });

  const removeTier = (tierName: string) => {
    const newTiers = { ...tiers };
    delete newTiers[tierName];
    setTiers(newTiers);
  };

  return (
    <Paper
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      variant="outlined"
    >
      <Box sx={{ m: 2 }}>
        <Typography variant="subtitle2">Price tiers</Typography>

        {Object.keys(tiers).map((tierName, index) => (
          <Box
            key={index}
            sx={{ width: "100%", display: "flex", mt: 2, gap: 1 }}
          >
            <TextField
              label="Tier name"
              value={tierName}
              onChange={(e) => renameTier(tierName, e.currentTarget.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Price"
              type="number"
              value={tiers[tierName]}
              onChange={(e) =>
                setTierPrice(tierName, parseFloat(e.currentTarget.value))
              }
              sx={{ flexGrow: 0 }}
            />
            <div>
              <IconButton onClick={() => removeTier(tierName)}>
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
