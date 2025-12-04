import { Stack } from "@kinzal-net/ui";
import { TwitterIcon } from "./TwitterIcon";
import { FacebookIcon } from "./FacebookIcon";
import { GooglePlusIcon } from "./GooglePlusIcon";

/**
 * Props for the SocialIcons component.
 */
interface SocialIconsProps {
  /** URL of the page to share */
  shareUrl: string;
  /** Text to include in the Twitter share */
  twitterText?: string;
}

/**
 * Container for social media sharing buttons.
 *
 * @remarks
 * Displays Twitter, Facebook, and Google+ share buttons in a horizontal stack.
 */
export function SocialIcons({ shareUrl, twitterText }: SocialIconsProps) {
  return (
    <Stack
      direction="horizontal"
      gap="none"
      align="center"
      className="gap-[10px]"
    >
      <TwitterIcon shareUrl={shareUrl} text={twitterText} />
      <FacebookIcon shareUrl={shareUrl} />
      <GooglePlusIcon shareUrl={shareUrl} />
    </Stack>
  );
}
