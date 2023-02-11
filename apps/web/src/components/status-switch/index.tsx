import { FetchStatus } from "@bitmetro/create-query";
import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  status?: FetchStatus;
  none?: React.ReactNode;
  fetching?: React.ReactNode;
  error: React.ReactNode;
}

export const StatusSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  status,
  none,
  fetching,
  error,
  children,
}) => {
  return (
    <>
      {status == undefined && none}
      {status === "fetching" && (fetching || <CircularProgress />)}
      {status === "error" && error}
      {status === "success" && <>{children}</>}
    </>
  );
};
