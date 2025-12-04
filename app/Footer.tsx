import { Footer as FooterComponent, Stack } from "@kinzal-net/ui";
import { SocialIcons } from "./components/social";
import { Copyright } from "./components/brand";

const SITE_URL = "http://www.kinzal.net/";
const SITE_NAME = "RakugakiYa";

/**
 * Site footer with social icons and copyright.
 *
 * @remarks
 * Footer containing:
 * - Social sharing buttons (Twitter, Facebook, Google+)
 * - Copyright notice with current year
 *
 * Note: Position is controlled by Layout component, not this component.
 */
export function Footer() {
  return (
    <FooterComponent className="h-footer border-r-[10px] border-primary px-4">
      <Stack
        direction="horizontal"
        gap="none"
        justify="between"
        align="center"
        className="h-full"
      >
        <SocialIcons shareUrl={SITE_URL} twitterText={SITE_NAME} />
        <Copyright />
      </Stack>
    </FooterComponent>
  );
}
