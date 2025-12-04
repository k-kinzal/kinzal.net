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
      className="font-brand text-[28px] leading-[50px] tracking-[10px] font-extralight border-l-[7px] border-primary px-4 h-full"
    >
      RakugakiYa
    </NavBrand>
  );
}
