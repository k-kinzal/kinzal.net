import { useEffect } from "react";
import { ImageGallery } from "../../components/gallery";
import { imageList } from "virtual:image-list";

/**
 * Original gallery page component.
 *
 * @remarks
 * Displays the original works gallery.
 * Images are sorted in reverse order (newest first).
 */
export function Component() {
  // Re-trigger :target CSS for SSG pages with hash URLs
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.location.hash = "";
      requestAnimationFrame(() => {
        window.location.hash = hash;
      });
    }
  }, []);

  const images = [...(imageList.original ?? [])].reverse();

  return <ImageGallery images={images} category="original" />;
}
