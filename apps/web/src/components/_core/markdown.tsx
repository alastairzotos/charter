import React from "react";
import stripIndent from "strip-indent";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  children: string;
}

export const Markdown: React.FC<Props> = ({ children }) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
      h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
      a: ({ children, href }) => (
        <Link href={href || "#"} target="_blank">
          {children}
        </Link>
      ),
      p: ({ children }) => (
        <>
          <Typography>{children}</Typography>
          <br />
        </>
      ),
    }}
  >
    {stripIndent(children)}
  </ReactMarkdown>
);
