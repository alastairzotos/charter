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
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { askWithAi } from "clients/ai.client";
import { AskAiDto, ServiceDto } from "dtos";
import { Markdown } from "components/_core/markdown";
import Link from "next/link";
import { urls } from "urls";
import { usePlaceholder } from "components/_core/ai/placeholders";

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
      const serviceParts = currentToken.split(" ");
      const id = serviceParts.pop()!;

      parts.push({
        type: "service",
        service: {
          id,
          name: serviceParts.join(" "),
        },
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

export const AiAsk: React.FC = () => {
  const [status, setStatus] = useState<FetchStatus | undefined>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AskAiDto | null>(null);
  const placeholder = usePlaceholder();

  const askAi = async () => {
    try {
      setStatus("fetching");
      const results = await askWithAi(query);

      setResults(results);

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      askAi();
    }
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
          <SearchIcon />
        </Button>
      </Box>

      {status === "fetching" && (
        <Paper
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>
            Hold tight, our AI travel guide is planning your perfect day
          </Typography>
        </Paper>
      )}

      {status === "error" && (
        <Alert severity="error">
          There was an unexpected error. We are working hard to fix it.
        </Alert>
      )}

      {!!results && status === "success" && (
        <Paper sx={{ p: 4 }}>
          <Markdown
            parseParagraphContent={(content) =>
              parseParagraphContent(content, results.services)
            }
          >
            {results.response}
          </Markdown>
        </Paper>
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
