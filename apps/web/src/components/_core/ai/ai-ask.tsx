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
import { AiResponse, ServiceDto } from "dtos";
import { Markdown } from "components/_core/markdown";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { urls } from "urls";
import { usePlaceholder } from "components/_core/ai/placeholders";
import { useWebSockets } from "hooks/ws";
import { getEnv } from "util/env";

const parseParagraphContent = (
  content: string,
  services: ServiceDto[]
): React.ReactNode => {
  const serviceTable = services.reduce(
    (acc, cur) => ({ ...acc, [cur._id]: cur }),
    {} as Record<string, ServiceDto>
  );

  type PartType = "text" | "service";
  interface Part {
    type: PartType;
    text?: string;
    service?: {
      id: string;
      name: string;
    };
  }

  const parts: Part[] = [];
  let currentPartType: PartType = "text";
  let currentToken = "";

  const addPart = () => {
    if (currentPartType === "text") {
      parts.push({
        type: "text",
        text: currentToken,
      });
    } else {
      let [name, id] = currentToken.split(":");

      if (!name || name === "") {
        name = "View";
      }

      parts.push({
        type: "service",
        service: { id, name },
      });
    }

    currentToken = "";
  };

  for (const c of content) {
    switch (currentPartType) {
      case "text":
        if (c === "[") {
          addPart();
          currentPartType = "service";
          continue;
        }
        break;

      case "service":
        if (c === "]") {
          addPart();
          currentPartType = "text";
          continue;
        }
        break;
    }
    currentToken += c;
  }

  addPart();

  return (
    <>
      {parts.map((part) =>
        part.type === "text" ? (
          <span>{part.text}</span>
        ) : (
          <Link
            target="_blank"
            href={urls.user.service(serviceTable[part.service?.id!])}
          >
            <Chip
              avatar={
                <Avatar
                  alt={part.service?.name}
                  src={serviceTable[part.service?.id!]?.photos?.[0] || ""}
                />
              }
              label={part.service?.name}
              sx={{ cursor: "pointer" }}
              size="small"
              variant="outlined"
            />
          </Link>
        )
      )}
    </>
  );
};

const wsRef = uuidv4();

export const AiAsk: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FetchStatus | null>(null);
  const [services, setServices] = useState<ServiceDto[] | null>(null);
  const [response, setResponse] = useState("");
  const placeholder = usePlaceholder();

  const [wsConn, refreshWsConn] = useWebSockets(
    getEnv().wsUrl,
    wsRef,
    (data: AiResponse) => {
      if (data.token) {
        setResponse((r) => r + data.token);
      } else if (data.services) {
        setServices(data.services);
      } else if (data.stop) {
        setStatus("success");
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
      setResponse("");
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
          {status === "fetching" && response === "" ? (
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
            <Markdown
              parseParagraphContent={(content) =>
                parseParagraphContent(content, services || [])
              }
            >
              {response}
            </Markdown>
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
          Note: this service is still under development and may give some false
          results
        </Typography>
      </Box>
    </Box>
  );
};
