import { Grid, Image, Link, Stack } from "@kinzal-net/ui";

interface ThumbnailGridProps {
  images: string[];
  category: string;
}

/**
 * ThumbnailGrid - Grid display of image thumbnails
 *
 * Displays images in a responsive grid:
 * - 2 columns on mobile
 * - 4 columns on small screens
 * - 6 columns on medium+ screens
 *
 * Each thumbnail links to its full-size view via hash navigation.
 * When any ImageViewer is :target, this grid slides off-screen.
 */
export function ThumbnailGrid({ images, category }: ThumbnailGridProps) {
  return (
    <Stack
      data-testid="thumbnail-grid"
      className={[
        // Position: absolute to fill container
        "absolute top-0 left-0 w-full h-full",
        // Enable scrolling with touch support
        "overflow-scroll",
        // iOS touch scrolling
        "[WebkitOverflowScrolling:touch]",
        // Padding for header and footer
        "pt-header pb-footer",
        // Slide off-screen when any sibling has :target
        // This works because ImageViewer with :target comes before ThumbnailGrid
        "[[id]:target~&]:-left-full",
      ].join(" ")}
    >
      <Grid gap="none" className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
        {images.map((img: string) => (
          <Link
            href={`#${img}`}
            variant="ghost"
            className="block p-0 m-0 border-0 bg-transparent"
            key={`thumb-${img}`}
          >
            <Image
              src={`app/images/${category}/${img}`}
              width={400}
              height={400}
              objectFit="cover"
              className={[
                // Square aspect ratio
                "w-full aspect-square",
                // Background for loading state
                "bg-white",
                // Smooth transition
                "transition-all duration-thumbnail",
                // Hardware acceleration for smooth scrolling
                "backface-hidden transform-gpu",
              ].join(" ")}
            />
          </Link>
        ))}
      </Grid>
    </Stack>
  );
}
