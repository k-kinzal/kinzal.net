import { Twitter, Facebook } from "lucide-react";
import { Stack, IconButton, Icon } from "@kinzal-net/ui";

interface SocialIconsProps {
  twitterUrl: string;
  facebookUrl: string;
  googlePlusUrl: string;
}

export function SocialIcons({
  twitterUrl,
  facebookUrl,
  googlePlusUrl,
}: SocialIconsProps) {
  const handleTwitterClick = () => {
    window.open(
      twitterUrl,
      "tweetwindow",
      "width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1"
    );
  };

  const handleFacebookClick = () => {
    window.open(
      facebookUrl,
      "FBwindow",
      "width=650, height=450, menubar=no, toolbar=no, scrollbars=yes"
    );
  };

  const handleGooglePlusClick = () => {
    window.open(
      googlePlusUrl,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
    );
  };

  // 34x34px square buttons matching Bootstrap Social style
  const buttonClass =
    "w-[34px] h-[34px] rounded-none text-white border border-black/20";

  return (
    <Stack direction="horizontal" gap="none" align="center" className="gap-[10px]">
      <IconButton
        onClick={handleTwitterClick}
        aria-label="Share on Twitter"
        className={`${buttonClass} bg-[#55acee] hover:bg-[#2795e9]`}
      >
        <Icon icon={Twitter} size={16} />
      </IconButton>
      <IconButton
        onClick={handleFacebookClick}
        aria-label="Share on Facebook"
        className={`${buttonClass} bg-[#3b5998] hover:bg-[#2d4373]`}
      >
        <Icon icon={Facebook} size={16} />
      </IconButton>
      <IconButton
        onClick={handleGooglePlusClick}
        aria-label="Share on Google+"
        className={`${buttonClass} bg-[#dd4b39] hover:bg-[#c23321]`}
      >
        <span className="text-xs font-bold">G+</span>
      </IconButton>
    </Stack>
  );
}
