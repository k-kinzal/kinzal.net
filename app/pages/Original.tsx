import { NewGallery } from "../components/NewGallery";
import { imageList } from "virtual:image-list";

export function Component() {
  const images = [...(imageList.original ?? [])].reverse();

  return (
    <NewGallery
      images={images}
      category="original"
      year={new Date().getFullYear()}
      isOriginal={true}
      isScrap={false}
    />
  );
}
