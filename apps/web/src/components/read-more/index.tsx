import { Button, Typography } from "@mui/material";
import React from "react";
import AnimatedShowMore from "react-animated-show-more";

interface Props {
  content: string;
}

export const ReadMore: React.FC<Props> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <AnimatedShowMore
      height={400}
      toggle={({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <Button>Read less</Button> : <Button>Read more</Button>
      }
      speed={500}
      shadowColor="rgba(0, 0, 0, 0.1)"
    >
      {lines.map((line, index) => (
        <Typography key={index} sx={{ mt: 2, mb: 2 }}>
          {line}
        </Typography>
      ))}
    </AnimatedShowMore>
  );
};
