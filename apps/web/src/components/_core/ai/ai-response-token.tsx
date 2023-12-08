import React from "react";
import { useFadeIn } from "hooks/fade-in";

interface Props {
  text: string;
}

export const AiResponseToken: React.FC<Props> = ({ text }) => {
  const fadeIn = useFadeIn();

  return (
    <span style={fadeIn}>
      {text.includes("\n")
        ? text.split("\n").map((part) => (
            <span>
              {part}
              <br />
            </span>
          ))
        : text}
    </span>
  );
};
