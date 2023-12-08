import React from "react";

interface Props {
  text: string;
}

export const AiResponseToken: React.FC<Props> = ({ text }) => (
  <span>
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
