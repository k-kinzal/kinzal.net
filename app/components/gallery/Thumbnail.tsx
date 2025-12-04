import { Link } from "@kinzal-net/ui";
import { OptimizedImage } from "../image/OptimizedImage";

/**
 * Props for the Thumbnail component.
 */
interface ThumbnailProps {
  /** Image filename */
  filename: string;
  /** Image category determining the source directory */
  category: "original" | "scrap";
  /** Callback when thumbnail is selected */
  onSelect: (filename: string) => void;
}

/**
 * Single thumbnail image with link to full-size view.
 *
 * @remarks
 * Displays a square thumbnail that opens the full-size image viewer when clicked.
 * Calls onSelect callback with the filename to update selection state.
 */
export function Thumbnail({ filename, category, onSelect }: ThumbnailProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(filename);
  };

  return (
    <Link
      href={`#${filename}`}
      variant="ghost"
      className="m-0 block border-0 bg-transparent p-0"
      onClick={handleClick}
    >
      <OptimizedImage
        category={category}
        filename={filename}
        variant="thumb-md"
        objectFit="cover"
        className="duration-thumbnail aspect-square w-full transform-gpu bg-white transition-all backface-hidden"
      />
    </Link>
  );
}
