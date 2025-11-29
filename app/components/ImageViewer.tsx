import { Image, Link, Stack } from "@kinzal-net/ui";

interface ImageViewerProps {
  id: string;
  src: string;
}

/**
 * ImageViewer - :target based image viewer for full-screen display
 *
 * Uses CSS :target pseudo-class for navigation:
 * - When not targeted: positioned off-screen (left: -100%)
 * - When targeted: positioned on-screen with high z-index
 *
 * Click on image closes viewer by navigating to "#"
 */
export function ImageViewer({ id, src }: ImageViewerProps) {
  return (
    <Stack
      id={id}
      data-testid="image-viewer"
      direction="horizontal"
      justify="center"
      align="center"
      className={[
        // Base positioning
        "absolute top-0 w-full h-full",
        // Background - always white for image viewer
        "bg-white",
        // Default state: off-screen to the left
        "-left-full",
        // When :target - show on screen with overlay z-index
        "target:left-0 target:z-overlay",
      ].join(" ")}
    >
      <Link href="#" variant="ghost" className="flex items-center justify-center max-w-full max-h-full">
        <Image
          src={src}
          objectFit="contain"
          className={[
            // Hidden by default, shown when parent is :target
            "hidden",
            // Size constraints - use viewport units for reliable sizing
            "max-w-full max-h-screen",
            // When parent is :target, show the image
            "[[id]:target_&]:block",
          ].join(" ")}
        />
      </Link>
    </Stack>
  );
}
