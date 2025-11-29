import fs from "fs";
import path from "path";
import type { Route } from "./+types/scrap";
import { Gallery } from "../components/Gallery";

export async function loader({}: Route.LoaderArgs) {
  const imagesDir = path.resolve(process.cwd(), "app/images/scrap");
  const files = fs
    .readdirSync(imagesDir)
    .filter((f: string) => !f.startsWith("."))
    .reverse();

  return {
    images: files,
    category: "scrap" as const,
    year: new Date().getFullYear(),
  };
}

export default function Scrap({ loaderData }: Route.ComponentProps) {
  const { images, category, year } = loaderData;

  return (
    <Gallery
      images={images}
      category={category}
      year={year}
      isOriginal={false}
      isScrap={true}
    />
  );
}
