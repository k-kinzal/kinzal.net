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
  const isOriginal = location.pathname === "/" || location.pathname === "/original";
  const isScrap = location.pathname === "/scrap";

  return (
    <NavbarComponent className="h-header">
      <Stack direction="horizontal" justify="between" align="center" className="h-full w-full">
        <Logo />
        <Stack direction="horizontal" gap="none" className="h-full">
          <NavLink
            href="/original"
            active={isOriginal}
            className="border-border h-full w-[120px] border-l leading-[60px] font-light"
          >
            Original
          </NavLink>
          <NavLink
            href="/scrap"
            active={isScrap}
            className="border-border h-full w-[120px] border-l leading-[60px] font-light"
          >
            Scrap
          </NavLink>
          <NavLink
            href="http://about.me/kinzal"
            className="border-border h-full w-[120px] border-l leading-[60px] font-light"
          >
            About me
          </NavLink>
        </Stack>
      </Stack>
    </NavbarComponent>
  );
}
