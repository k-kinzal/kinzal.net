import { useEffect } from "react";
import { Stack } from "@kinzal-net/ui";
import { ImageViewer } from "./ImageViewer";
import { ThumbnailGrid } from "./ThumbnailGrid";

interface ImageGalleryProps {
  images: string[];
  category: "original" | "scrap";
}

/**
 * ImageGallery - Container for the image gallery functionality
 *
 * Orchestrates ImageViewer and ThumbnailGrid components.
 * Uses CSS :target for navigation between thumbnail view and full-size view.
 *
 * Structure:
 * - Multiple ImageViewer components (one per image, positioned off-screen by default)
 * - ThumbnailGrid (shows all thumbnails, slides off when an ImageViewer is targeted)
 */
export function ImageGallery({ images, category }: ImageGalleryProps) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Re-trigger :target by re-setting the hash
      window.location.hash = "";
      window.location.hash = hash;
    }
  }, []);

  return (
    <Stack className="relative w-full h-full m-0 p-0" id="content">
      {/* Image viewers - each one is positioned off-screen until :target */}
      {images.map((img: string) => (
        <ImageViewer
          key={`view-${img}`}
          id={img}
          category={category}
          filename={img}
        />
      ))}

      {/* Thumbnail grid - visible by default, slides off when any viewer is :target */}
      <ThumbnailGrid images={images} category={category} />
    </Stack>
  );
}
