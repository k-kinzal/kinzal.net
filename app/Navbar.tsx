import { useLocation } from "react-router-dom";
import { Navbar as NavbarComponent, NavLink, Stack } from "@kinzal-net/ui";
import { Logo } from "./components/brand";

/**
 * Site navigation bar with brand and page links.
 *
 * @remarks
 * Navbar containing:
 * - Site brand linking to home
 * - Navigation links to Original, Scrap, and About me pages
 * - Active state highlighting based on current route
 *
 * Note: Position is controlled by Layout component, not this component.
 */
export function Navbar() {
  const location = useLocation();
  const isOriginal =
    location.pathname === "/" || location.pathname === "/original.html";
  const isScrap = location.pathname === "/scrap.html";

  return (
    <NavbarComponent className="h-header">
      <Stack
        direction="horizontal"
        justify="between"
        align="center"
        className="w-full h-full"
      >
        <Logo />
        <Stack direction="horizontal" gap="none" className="h-full">
          <NavLink
            href="/original.html"
            active={isOriginal}
            className="w-[120px] h-full font-light leading-[60px] border-l border-border"
          >
            Original
          </NavLink>
          <NavLink
            href="/scrap.html"
            active={isScrap}
            className="w-[120px] h-full font-light leading-[60px] border-l border-border"
          >
            Scrap
          </NavLink>
          <NavLink
            href="http://about.me/kinzal"
            className="w-[120px] h-full font-light leading-[60px] border-l border-border"
          >
            About me
          </NavLink>
        </Stack>
      </Stack>
    </NavbarComponent>
  );
}
