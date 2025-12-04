import { Facebook } from "lucide-react";
import { Icon } from "@kinzal-net/ui";
import { SocialIcon } from "./SocialIcon";

/**
 * Props for the FacebookIcon component.
 */
interface FacebookIconProps {
  /** URL of the page to share */
  shareUrl: string;
}

/**
 * Facebook share button.
 *
 * @remarks
 * Constructs a Facebook share URL and opens a popup when clicked.
 */
export function FacebookIcon({ shareUrl }: FacebookIconProps) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <SocialIcon
      url={facebookUrl}
      windowName="FBwindow"
      popupWidth={650}
      popupHeight={450}
      ariaLabel="Share on Facebook"
      bgColor="bg-[#3b5998]"
      hoverBgColor="hover:bg-[#2d4373]"
    >
      <Icon icon={Facebook} size={16} />
    </SocialIcon>
  );
}
