import { Twitter } from "lucide-react";
import { Icon } from "@kinzal-net/ui";
import { SocialIcon } from "./SocialIcon";

/**
 * Props for the TwitterIcon component.
 */
interface TwitterIconProps {
  /** URL of the page to share */
  shareUrl: string;
  /** Text to include in the tweet */
  text?: string;
}

/**
 * Twitter share button.
 *
 * @remarks
 * Constructs a Twitter share intent URL and opens a popup when clicked.
 */
export function TwitterIcon({ shareUrl, text }: TwitterIconProps) {
  const params = new URLSearchParams();
  params.set("url", shareUrl);
  if (text) {
    params.set("text", text);
  }
  const twitterUrl = `https://twitter.com/intent/tweet?${params.toString()}`;

  return (
    <SocialIcon
      url={twitterUrl}
      windowName="tweetwindow"
      popupWidth={550}
      popupHeight={450}
      ariaLabel="Share on Twitter"
      bgColor="bg-[#55acee]"
      hoverBgColor="hover:bg-[#2795e9]"
    >
      <Icon icon={Twitter} size={16} />
    </SocialIcon>
  );
}
