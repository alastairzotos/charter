import { FetchStatus } from "@bitmetro/create-query";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchWithAi } from "clients/ai.client";
import { ServiceDto } from "dtos";
import React, { useState } from "react";
import { usePlaceholder } from "components/_core/ai/placeholders";

interface Props {
  onResultsUpdated: (services: ServiceDto[]) => void;
}

export const AiSearch: React.FC<Props> = ({ onResultsUpdated }) => {
  const [status, setStatus] = useState<FetchStatus | undefined>();
  const [query, setQuery] = useState("");
  const placeholder = usePlaceholder();

  const performSearch = async () => {
    try {
      setStatus("fetching");
      const results = await searchWithAi(query);

      onResultsUpdated(results);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
        <TextField
          sx={{
            flex: 1,
            background: "white",
          }}
          variant="outlined"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={status === "fetching"}
          onKeyDown={handleKeyUp}
        />

        <Button
          variant="contained"
          size="small"
          disabled={status === "fetching"}
          onClick={performSearch}
        >
          {status === "fetching" ? (
            <CircularProgress size={20} />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </Box>
    </>
  );
};
