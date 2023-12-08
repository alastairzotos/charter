import React, { useEffect, useState } from "react";
import { FetchStatus } from "@bitmetro/create-query";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { askWithAi } from "clients/ai.client";
import { AiContentToken, AiResponse } from "dtos";
import { v4 as uuidv4 } from "uuid";
import { usePlaceholder } from "components/_core/ai/placeholders";
import { useWebSockets } from "hooks/ws";
import { getEnv } from "util/env";
import { ServiceChip } from "components/_core/ai/service-chip";
import { AiResponseToken } from "components/_core/ai/ai-response-token";

const wsRef = uuidv4();

export const AiAsk: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FetchStatus | null>(null);
  const [content, setContent] = useState<AiContentToken[]>([]);

  const placeholder = usePlaceholder();

  const [wsConn, refreshWsConn] = useWebSockets(
    getEnv().wsUrl,
    wsRef,
    (data: AiResponse) => {
      switch (data.type) {
        case "token":
        case "service-ref":
          setContent((c) => [...c, data as AiContentToken]);
          break;

        case "stop":
          setStatus("success");
          break;
      }
    }
  );

  useEffect(() => {
    if (wsConn === "disconnected") {
      refreshWsConn();
    }
  }, [wsConn]);

  const askAi = async () => {
    try {
      setContent([]);
      setStatus("fetching");

      await askWithAi(query, wsRef);
    } catch {
      setStatus("error");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      askAi();
    }
  };

  const padding: SxProps = {
    p: { xs: 1, md: 4 },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
          onClick={askAi}
        >
          <SearchIcon fontSize="small" />
        </Button>
      </Box>

      {status && (
        <Paper sx={padding}>
          {status === "fetching" && !content.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            content.map((token, index) =>
              token.type === "service-ref" ? (
                <ServiceChip service={token.serviceRef} />
              ) : (
                <AiResponseToken text={token.token} />
              )
            )
          )}
        </Paper>
      )}

      {status === "error" && (
        <Alert severity="error">
          There was an unexpected error. We are working hard to fix it.
        </Alert>
      )}

      <Box sx={{ textAlign: "right" }}>
        <Typography variant="caption">
          Note: this service uses artificial intelligence and may give some
          false results
        </Typography>
      </Box>
    </Box>
  );
};
