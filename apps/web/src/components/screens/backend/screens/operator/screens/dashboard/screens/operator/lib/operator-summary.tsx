import { Avatar, Button, Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import Link from "next/link";
import React from "react";

import { Titled } from "components/lib/titled";
import { useOperatorDashboard } from "contexts/operator-dashboard";

interface Props {
  operator: OperatorDto;
}

export const OperatorSummary: React.FC<Props> = ({ operator }) => {
  const { getOperatorEditUrl } = useOperatorDashboard();

  return (
    <Titled title={operator.name} avatar={<Avatar src={operator.photo} />}>
      <Typography variant="subtitle2">{operator.email}</Typography>
      <Typography variant="subtitle2">{operator.address}</Typography>
      <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
      <Button
        href={getOperatorEditUrl(operator)}
        LinkComponent={Link}
        variant="outlined"
        sx={{ mt: 3 }}
      >
        Edit
      </Button>
    </Titled>
  );
};
