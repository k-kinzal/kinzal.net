import { NavBrand } from "@kinzal-net/ui";

/**
 * Site brand logo linking to home page.
 *
 * @remarks
 * Displays the site name "RakugakiYa" with brand styling.
 */
export function Logo() {
  return (
    <NavBrand
      href="/"
      className="font-brand border-primary h-full border-l-[7px] px-4 text-[28px] leading-[50px] font-extralight tracking-[10px]"
    >
      RakugakiYa
    </NavBrand>
  );
}
