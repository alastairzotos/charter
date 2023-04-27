import React from "react";

interface Props {
  url: string;
  alt: string;
  onClick: () => void;
}

export const ImageGalleryItem: React.FC<Props> = ({ url, alt, onClick }) => {
  return (
    <img
      src={url}
      alt={alt}
      style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
      onClick={onClick}
    />
  );
};
