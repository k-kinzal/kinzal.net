import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialIcons } from "./SocialIcons";

describe("SocialIcons", () => {
  const shareUrl = "https://example.com";
  const twitterText = "Hello World";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Twitter, Facebook, and Google+ buttons", () => {
    render(<SocialIcons shareUrl={shareUrl} />);

    expect(screen.getByRole("button", { name: /share on twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share on facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share on google\+/i })).toBeInTheDocument();
  });

  it("opens Twitter share popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<SocialIcons shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button", { name: /share on twitter/i }));

    expect(window.open).toHaveBeenCalledWith(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      "tweetwindow",
      expect.stringContaining("noopener")
    );
  });

  it("includes twitter text when provided", async () => {
    const user = userEvent.setup();
    render(<SocialIcons shareUrl={shareUrl} twitterText={twitterText} />);

    await user.click(screen.getByRole("button", { name: /share on twitter/i }));

    // URLSearchParams encodes space as + instead of %20
    const params = new URLSearchParams();
    params.set("url", shareUrl);
    params.set("text", twitterText);
    const expectedUrl = `https://twitter.com/intent/tweet?${params.toString()}`;
    expect(window.open).toHaveBeenCalledWith(
      expectedUrl,
      "tweetwindow",
      expect.stringContaining("noopener")
    );
  });

  it("opens Facebook share popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<SocialIcons shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button", { name: /share on facebook/i }));

    expect(window.open).toHaveBeenCalledWith(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "FBwindow",
      expect.stringContaining("noopener")
    );
  });

  it("opens Google+ share popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<SocialIcons shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button", { name: /share on google\+/i }));

    expect(window.open).toHaveBeenCalledWith(
      `https://plus.google.com/share?url=${encodeURIComponent(shareUrl)}`,
      "GPwindow",
      expect.stringContaining("noopener")
    );
  });

  it("includes security attributes in popup features", async () => {
    const user = userEvent.setup();
    render(<SocialIcons shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button", { name: /share on twitter/i }));

    const features = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][2];
    expect(features).toContain("noopener");
    expect(features).toContain("noreferrer");
  });

  it("has accessible button labels", () => {
    render(<SocialIcons shareUrl={shareUrl} />);

    const twitterButton = screen.getByRole("button", { name: /share on twitter/i });
    const facebookButton = screen.getByRole("button", { name: /share on facebook/i });
    const googlePlusButton = screen.getByRole("button", { name: /share on google\+/i });

    expect(twitterButton).toHaveAccessibleName("Share on Twitter");
    expect(facebookButton).toHaveAccessibleName("Share on Facebook");
    expect(googlePlusButton).toHaveAccessibleName("Share on Google+");
  });
});
