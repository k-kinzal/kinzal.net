import { ReactNode } from "react";
import { IconButton } from "@kinzal-net/ui";

/**
 * Configuration for a social share popup window.
 */
interface PopupConfig {
  width: number;
  height: number;
}

/**
 * Opens a social share popup window with security attributes.
 *
 * @param url - The share URL to open
 * @param name - Window name for the popup
 * @param config - Popup window configuration
 */
function openSocialPopup(
  url: string,
  name: string,
  config: PopupConfig
): void {
  const features = [
    `width=${config.width}`,
    `height=${config.height}`,
    "menubar=no",
    "toolbar=no",
    "scrollbars=yes",
    "resizable=yes",
    "noopener",
    "noreferrer",
  ].join(",");
  window.open(url, name, features);
}

/**
 * Props for the SocialIcon component.
 */
interface SocialIconProps {
  /** Share URL to open when clicked */
  url: string;
  /** Window name for the popup */
  windowName: string;
  /** Popup window width */
  popupWidth: number;
  /** Popup window height */
  popupHeight: number;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Background color class */
  bgColor: string;
  /** Hover background color class */
  hoverBgColor: string;
  /** Icon content to display */
  children: ReactNode;
}

/**
 * Base component for social media share buttons.
 *
 * @remarks
 * Renders an icon button that opens a share popup when clicked.
 * Includes security attributes (noopener, noreferrer) for the popup.
 */
export function SocialIcon({
  url,
  windowName,
  popupWidth,
  popupHeight,
  ariaLabel,
  bgColor,
  hoverBgColor,
  children,
}: SocialIconProps) {
  const handleClick = () => {
    openSocialPopup(url, windowName, {
      width: popupWidth,
      height: popupHeight,
    });
  };

  const buttonClass =
    "w-[34px] h-[34px] rounded-none text-white border border-black/20";

  return (
    <IconButton
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`${buttonClass} ${bgColor} ${hoverBgColor}`}
    >
      {children}
    </IconButton>
  );
}
