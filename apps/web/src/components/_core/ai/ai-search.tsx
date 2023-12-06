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
import React, { useEffect, useState } from "react";

interface Props {
  onResultsUpdated: (services: ServiceDto[]) => void;
}

const placeholders = [
  "I would like to try some watersports",
  "What family-friendly boat trips are there?",
  "I'd like to hire a boat",
  "I want to drive a car around the island",
  "I would like to see Corfu town",
];

export const AiSearch: React.FC<Props> = ({ onResultsUpdated }) => {
  const [status, setStatus] = useState<FetchStatus | undefined>();
  const [query, setQuery] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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
          placeholder={placeholders[currentPlaceholderIndex]}
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
