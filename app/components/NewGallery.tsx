import { Navbar, NavBrand, NavLink, Footer, Stack } from "@kinzal-net/ui";
import { ImageGallery } from "./ImageGallery";
import { SocialIcons } from "./SocialIcons";
import { Copyright } from "./Copyright";

interface GalleryProps {
  images: string[];
  category: "original" | "scrap";
  year: number;
  isOriginal: boolean;
  isScrap: boolean;
}

export function NewGallery({
  images,
  category,
  year,
  isOriginal,
  isScrap,
}: GalleryProps) {
  const twitterUrl =
    "http://twitter.com/share?count=horizontal&original_referer=http://www.kinzal.net/&text=RakugakiYa&tw_p=tweetbutton&url=http://www.kinzal.net/";
  const facebookUrl =
    "http://www.facebook.com/share.php?u=http://www.kinzal.net/";
  const googlePlusUrl =
    "https://plus.google.com/share?url=http://www.kinzal.net/";

  return (
    <>
      {/* Header / Navigation */}
      <Navbar position="fixed" className="h-header">
        <Stack direction="horizontal" justify="between" align="center" className="w-full h-full">
          <NavBrand
            href="/"
            className="font-brand text-[28px] leading-[50px] tracking-[10px] font-extralight border-l-[7px] border-primary px-4 h-full"
          >
            RakugakiYa
          </NavBrand>
          <Stack direction="horizontal" gap="none" className="h-full">
            <NavLink href="original.html" active={isOriginal} className="w-[120px] h-full font-light leading-[60px] border-l border-border">
              Original
            </NavLink>
            <NavLink href="scrap.html" active={isScrap} className="w-[120px] h-full font-light leading-[60px] border-l border-border">
              Scrap
            </NavLink>
            <NavLink href="http://about.me/kinzal" className="w-[120px] h-full font-light leading-[60px] border-l border-border">
              About me
            </NavLink>
          </Stack>
        </Stack>
      </Navbar>

      {/* Contents - using proper project components */}
      <ImageGallery images={images} category={category} />

      {/* Footer */}
      <Footer position="fixed" className="h-footer border-r-[10px] border-primary px-4">
        <Stack direction="horizontal" gap="none" justify="between" align="center" className="h-full">
          <SocialIcons
            twitterUrl={twitterUrl}
            facebookUrl={facebookUrl}
            googlePlusUrl={googlePlusUrl}
          />
          <Copyright year={year} />
        </Stack>
      </Footer>
    </>
  );
}
