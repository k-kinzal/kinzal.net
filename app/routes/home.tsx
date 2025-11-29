import fs from "fs";
import path from "path";
import type { Route } from "./+types/home";
import { NewGallery } from "../components/NewGallery";

export async function loader({}: Route.LoaderArgs) {
  const imagesDir = path.resolve(process.cwd(), "app/images/original");
  const files = fs
    .readdirSync(imagesDir)
    .filter((f: string) => !f.startsWith("."))
    .reverse();

  return {
    images: files,
    category: "original" as const,
    year: new Date().getFullYear(),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
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
