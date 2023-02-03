import { Avatar, Button, Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { Titled } from "src/components/titled";

interface Props {
  operator: OperatorDto;
}

export const OperatorSummary: React.FC<Props> = ({ operator }) => {
  return (
    <Titled title={operator.name} avatar={<Avatar src={operator.photo} />}>
      <Typography variant="subtitle2">{operator.email}</Typography>
      <Typography variant="subtitle2">{operator.address}</Typography>
      <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
      <Button
        href={urls.admin.operatorEdit(operator._id)}
        LinkComponent={Link}
        variant="outlined"
        sx={{ mt: 3 }}
      >
        Edit
      </Button>
    </Titled>
  );
};
