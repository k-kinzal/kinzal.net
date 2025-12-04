import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TwitterIcon } from "./TwitterIcon";

describe("TwitterIcon", () => {
  const shareUrl = "https://example.com";
  const text = "Hello World";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Twitter share button", () => {
    render(<TwitterIcon shareUrl={shareUrl} />);

    expect(screen.getByRole("button", { name: "Share on Twitter" })).toBeInTheDocument();
  });

  it("opens Twitter popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<TwitterIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    expect(window.open).toHaveBeenCalledWith(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      "tweetwindow",
      expect.stringContaining("noopener")
    );
  });

  it("includes text parameter when provided", async () => {
    const user = userEvent.setup();
    render(<TwitterIcon shareUrl={shareUrl} text={text} />);

    await user.click(screen.getByRole("button"));

    // URLSearchParams encodes space as + instead of %20
    const params = new URLSearchParams();
    params.set("url", shareUrl);
    params.set("text", text);
    const expectedUrl = `https://twitter.com/intent/tweet?${params.toString()}`;
    expect(window.open).toHaveBeenCalledWith(
      expectedUrl,
      "tweetwindow",
      expect.stringContaining("noopener")
    );
  });

  it("uses correct popup dimensions", async () => {
    const user = userEvent.setup();
    render(<TwitterIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    const features = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][2];
    expect(features).toContain("width=550");
    expect(features).toContain("height=450");
  });
});
