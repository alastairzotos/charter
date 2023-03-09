import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";

import { ImageGalleryItem } from "src/components/image-gallery/image-gallery-item";
import { ImageGalleryNavBase } from "src/components/image-gallery/image-gallery-nav-base";

interface Props {
  items: string[];
}

export const ImageGallery: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const ref = useRef<any>();

  useEffect(() => {
    router.beforePopState(() => {
      if (isFullscreen) {
        window.history.pushState(null, "", router.asPath);
        setIsFullscreen(false);
        ref.current.toggleFullScreen();
        return false;
      }

      return true;
    });

    return () => router.beforePopState(() => true);
  }, [router, isFullscreen]);

  return (
    <Box sx={{ mt: 3 }}>
      <ReactImageGallery
        ref={ref}
        showPlayButton={false}
        showFullscreenButton={true}
        useBrowserFullscreen={false}
        onScreenChange={setIsFullscreen}
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
