import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";

import { ImageGalleryItem } from "components/image-gallery/image-gallery-item";
import { ImageGalleryNavBase } from "components/image-gallery/image-gallery-nav-base";

interface Props {
  items: string[];
}

export const ImageGallery: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const ref = useRef<ReactImageGallery>();

  const enterFullscreen = () => {
    setIsFullscreen(true);
    ref.current?.fullScreen();
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    ref.current?.exitFullScreen();
  };

  useEffect(() => {
    router.beforePopState(() => {
      if (isFullscreen) {
        window.history.pushState(null, "", router.asPath);
        exitFullscreen();
        return false;
      }

      return true;
    });

    return () => router.beforePopState(() => true);
  }, [router, isFullscreen]);

  return (
    <ReactImageGallery
      ref={ref as any}
      showPlayButton={false}
      showFullscreenButton={false}
      useBrowserFullscreen={false}
      onScreenChange={setIsFullscreen}
      showThumbnails={false}
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
        renderItem: (item) => (
          <ImageGalleryItem
            url={item.original}
            alt={item.originalAlt || "Operator photo"}
            onClick={enterFullscreen}
          />
        ),
      }))}
    />
  );
};
