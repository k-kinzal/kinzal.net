// Mock for virtual:image-variants
export const imageVariants: Record<string, Record<string, () => Promise<{ default: string }>>> = {
  "/app/images/original/img001.jpg": {
    "faceCrop&w=200&h=200&fit=cover&format=avif": () =>
      Promise.resolve({ default: "/mock/img001-thumb-sm.avif" }),
    "faceCrop&w=200&h=200&fit=cover&format=webp": () =>
      Promise.resolve({ default: "/mock/img001-thumb-sm.webp" }),
    "faceCrop&w=200&h=200&fit=cover": () =>
      Promise.resolve({ default: "/mock/img001-thumb-sm.png" }),
    "faceCrop&w=400&h=400&fit=cover&format=avif": () =>
      Promise.resolve({ default: "/mock/img001-thumb-md.avif" }),
    "faceCrop&w=400&h=400&fit=cover&format=webp": () =>
      Promise.resolve({ default: "/mock/img001-thumb-md.webp" }),
    "faceCrop&w=400&h=400&fit=cover": () =>
      Promise.resolve({ default: "/mock/img001-thumb-md.png" }),
    "w=1920&fit=inside&format=avif": () => Promise.resolve({ default: "/mock/img001-full.avif" }),
    "w=1920&fit=inside&format=webp": () => Promise.resolve({ default: "/mock/img001-full.webp" }),
    "w=1920&fit=inside": () => Promise.resolve({ default: "/mock/img001-full.png" }),
  },
  "/app/images/scrap/img001.png": {
    "faceCrop&w=400&h=400&fit=cover&format=avif": () =>
      Promise.resolve({ default: "/mock/scrap-img001-thumb-md.avif" }),
    "faceCrop&w=400&h=400&fit=cover&format=webp": () =>
      Promise.resolve({ default: "/mock/scrap-img001-thumb-md.webp" }),
    "faceCrop&w=400&h=400&fit=cover": () =>
      Promise.resolve({ default: "/mock/scrap-img001-thumb-md.png" }),
  },
};
