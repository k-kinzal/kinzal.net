import type { Route } from "./+types/original";
import { NewGallery } from "../components/NewGallery";
import { imageList } from "virtual:image-list";

export async function loader({}: Route.LoaderArgs) {
  const images = [...(imageList.original ?? [])].reverse();

  return {
    images,
    category: "original" as const,
    year: new Date().getFullYear(),
  };
}

export default function Original({ loaderData }: Route.ComponentProps) {
  const { images, category, year } = loaderData;

  return (
    <NewGallery
      images={images}
      category={category}
      year={year}
      isOriginal={true}
      isScrap={false}
    />
  );
}
