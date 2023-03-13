import { Button } from "@mui/material";
import React from "react";
import AnimatedShowMore from "react-animated-show-more";

export const ReadMore: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AnimatedShowMore
      height={400}
      toggle={({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <Button>Read less</Button> : <Button>Read more</Button>
      }
      speed={500}
      shadowColor="rgba(0, 0, 0, 0.1)"
    >
      {children}
    </AnimatedShowMore>
  );
};
