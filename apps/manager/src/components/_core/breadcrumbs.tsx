import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";
import { useIsDesktop } from "ui";

export interface BreadcrumbLink {
  href: string;
  title: string;
}

interface Props {
  current: string;
  list?: BreadcrumbLink[];
}

export const LOADING_BREADCRUMB = "{LOADING}";

const getNodeForBreadcrumbTitle = (title: string): React.ReactNode =>
  title === LOADING_BREADCRUMB ? <CircularProgress size={14} /> : <>{title}</>;

export const Breadcrumbs: React.FC<Props> = ({ current, list }) => {
  const isDesktop = useIsDesktop();

  const last = list ? list[list.length - 1] : undefined;

  if (!isDesktop) {
    if (last) {
      return (
        <Box sx={{ display: "flex" }}>
          <Button
            variant="text"
            component={NextLink}
            href={last.href}
            sx={{ mb: 1, mr: 1 }}
          >
            <ChevronLeftIcon /> {getNodeForBreadcrumbTitle(last.title)}
          </Button>

          <Box sx={{ display: "flex", mt: 0.8, maxWidth: 200 }}>
            <Typography sx={{ mr: 2 }}>/</Typography>

            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {getNodeForBreadcrumbTitle(current)}
            </Typography>
          </Box>
        </Box>
      );
    } else {
      return null;
    }
  }

  return (
    <MuiBreadcrumbs sx={{ mb: 3 }}>
      {list?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          underline="hover"
          color="inherit"
          component={NextLink}
        >
          {getNodeForBreadcrumbTitle(item.title)}
        </Link>
      ))}

      <Typography color="text.primary">
        {getNodeForBreadcrumbTitle(current)}
      </Typography>
    </MuiBreadcrumbs>
  );
};
