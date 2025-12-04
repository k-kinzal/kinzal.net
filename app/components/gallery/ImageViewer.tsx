import { Link, Stack } from "@kinzal-net/ui";
import { OptimizedImage } from "../image/OptimizedImage";

/**
 * Props for the ImageViewer component.
 */
interface ImageViewerProps {
  /** Unique identifier for the viewer element */
  id: string;
  /** Image category determining the source directory */
  category: "original" | "scrap";
  /** Image filename */
  filename: string;
  /** Whether this viewer is currently selected */
  isSelected: boolean;
  /** Callback to close the viewer */
  onClose: () => void;
}

/**
 * Full-screen image viewer.
 *
 * @remarks
 * Displays a full-size image with positioning controlled by props:
 * - When not selected: positioned off-screen (left: -100%)
 * - When selected: positioned on-screen with high z-index
 *
 * Click on image closes viewer by calling onClose callback.
 */
export function ImageViewer({
  id,
  category,
  filename,
  isSelected,
  onClose,
}: ImageViewerProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Stack
      id={id}
      data-testid="image-viewer"
      direction="horizontal"
      justify="center"
      align="center"
      className={`absolute top-0 w-full h-full bg-white ${
        isSelected ? "left-0 z-overlay" : "-left-full"
      }`}
    >
      <Link
        href="#"
        variant="ghost"
        className="flex items-center justify-center max-w-full max-h-full"
        onClick={handleClose}
      >
        <OptimizedImage
          category={category}
          filename={filename}
          variant="full"
          objectFit="contain"
          className={`max-w-full max-h-screen ${isSelected ? "block" : "hidden"}`}
        />
      </Link>
    </Stack>
  );
}
