import type { Route } from "./+types/scrap";
import { NewGallery } from "../components/NewGallery";
import { imageList } from "virtual:image-list";

export async function loader({}: Route.LoaderArgs) {
  const images = [...(imageList.scrap ?? [])].reverse();

  return {
    images,
    category: "scrap" as const,
    year: new Date().getFullYear(),
  };
}

export default function Scrap({ loaderData }: Route.ComponentProps) {
  const { images, category, year } = loaderData;

  return (
    <NewGallery
      images={images}
      category={category}
      year={year}
      isOriginal={false}
      isScrap={true}
    />
  );
}
