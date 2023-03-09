import { styled } from "@mui/styles";
import React from "react";

interface Props {
  url: string;
  alt: string;
  onClick: () => void;
}

const Underlay = styled("div")(() => ({
  backgroundColor: "black",
  width: "100%",
  height: "100%",
}));

export const ImageGalleryItem: React.FC<Props> = ({ url, alt, onClick }) => {
  return (
    <Underlay>
      <img
        src={url}
        alt={alt}
        height={500}
        style={{
          marginLeft: "-100%",
          marginRight: "-100%",
        }}
        onClick={onClick}
      />
    </Underlay>
  );
};
