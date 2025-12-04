import { SocialIcon } from "./SocialIcon";

/**
 * Props for the GooglePlusIcon component.
 */
interface GooglePlusIconProps {
  /** URL of the page to share */
  shareUrl: string;
}

/**
 * Google+ share button.
 *
 * @remarks
 * Constructs a Google+ share URL and opens a popup when clicked.
 * Note: Google+ has been discontinued but kept for legacy support.
 */
export function GooglePlusIcon({ shareUrl }: GooglePlusIconProps) {
  const googlePlusUrl = `https://plus.google.com/share?url=${encodeURIComponent(shareUrl)}`;

  return (
    <SocialIcon
      url={googlePlusUrl}
      windowName="GPwindow"
      popupWidth={600}
      popupHeight={600}
      ariaLabel="Share on Google+"
      bgColor="bg-[#dd4b39]"
      hoverBgColor="hover:bg-[#c23321]"
    >
      <span className="text-xs font-bold">G+</span>
    </SocialIcon>
  );
}
