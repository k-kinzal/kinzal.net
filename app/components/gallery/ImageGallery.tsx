import { Grid, Stack } from "@kinzal-net/ui";
import { useHash } from "../../hooks/useHash";
import { ImageViewer } from "./ImageViewer";
import { Thumbnail } from "./Thumbnail";

/**
 * Props for the ImageGallery component.
 */
interface ImageGalleryProps {
  /** List of image filenames to display */
  images: string[];
  /** Image category determining the source directory */
  category: "original" | "scrap";
  /** Initial selected image for Storybook/testing */
  initialSelectedImage?: string;
}

/**
 * Container for the image gallery functionality.
 *
 * @remarks
 * Uses useHash hook for navigation between thumbnail view and full-size view.
 *
 * Structure:
 * - Multiple ImageViewer components (one per image, hidden by default)
 * - Thumbnail grid (shows all thumbnails, slides off when an image is selected)
 *
 * Grid layout:
 * - 2 columns on mobile
 * - 4 columns on small screens
 * - 6 columns on medium+ screens
 */
export function ImageGallery({ images, category, initialSelectedImage }: ImageGalleryProps) {
  const { hash: selectedImage, setHash: setSelectedImage } = useHash(initialSelectedImage);
  const hasSelection = selectedImage !== "";

  return (
    <Stack className="relative m-0 h-full w-full p-0" id="content">
      {images.map((img: string) => (
        <ImageViewer
          key={`view-${img}`}
          id={img}
          category={category}
          filename={img}
          isSelected={selectedImage === img}
          onClose={() => setSelectedImage("")}
        />
      ))}
      <Stack
        data-testid="thumbnail-grid"
        className={`[WebkitOverflowScrolling:touch] pt-header pb-footer absolute top-0 h-full w-full overflow-scroll ${
          hasSelection ? "-left-full" : "left-0"
        }`}
      >
        <Grid gap="none" className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((filename) => (
            <Thumbnail
              key={`thumb-${filename}`}
              filename={filename}
              category={category}
              onSelect={setSelectedImage}
            />
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
