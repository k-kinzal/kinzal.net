import { NewGallery } from "../components/NewGallery";
import { imageList } from "virtual:image-list";

export function Component() {
  const images = [...(imageList.scrap ?? [])].reverse();

  return (
    <NewGallery
      images={images}
      category="scrap"
      year={new Date().getFullYear()}
      isOriginal={false}
      isScrap={true}
    />
  );
}
