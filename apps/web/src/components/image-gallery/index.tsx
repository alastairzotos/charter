import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";
import React from "react";
import ReactImageGallery from "react-image-gallery";

import { ImageGalleryItem } from "src/components/image-gallery/image-gallery-item";
import { ImageGalleryNavBase } from "src/components/image-gallery/image-gallery-nav-base";

interface Props {
  items: string[];
}

export const ImageGallery: React.FC<Props> = ({ items }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <ReactImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={items.length > 1}
        renderLeftNav={(onClick, disabled) => (
          <ImageGalleryNavBase
            onClick={onClick}
            disabled={disabled}
            position="left"
          >
            <ChevronLeftIcon fontSize="large" />
          </ImageGalleryNavBase>
        )}
        renderRightNav={(onClick, disabled) => (
          <ImageGalleryNavBase
            onClick={onClick}
            disabled={disabled}
            position="right"
          >
            <ChevronRightIcon fontSize="large" />
          </ImageGalleryNavBase>
        )}
        items={items.map((item) => ({
          original: item,
          thumbnail: item,
          thumbnailHeight: 100,
          originalHeight: 500,
          renderItem: (item) => (
            <ImageGalleryItem
              url={item.original}
              alt={item.originalAlt || "Operator photo"}
            />
          ),
        }))}
      />
    </Box>
  );
};
