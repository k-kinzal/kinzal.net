declare module "virtual:image-list" {
  export const imageList: Record<string, string[]>;
}

declare module "virtual:image-variants" {
  // Note: import.meta.glob with `import: 'default'` returns the default export directly
  export const imageVariants: Record<string, Record<string, () => Promise<string>>>;
}

declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ImgHTMLAttributes<T> {
    lazyload?: string;
  }
}
