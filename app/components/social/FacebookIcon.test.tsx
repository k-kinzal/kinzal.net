import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FacebookIcon } from "./FacebookIcon";

describe("FacebookIcon", () => {
  const shareUrl = "https://example.com";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Facebook share button", () => {
    render(<FacebookIcon shareUrl={shareUrl} />);

    expect(screen.getByRole("button", { name: "Share on Facebook" })).toBeInTheDocument();
  });

  it("opens Facebook popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<FacebookIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    expect(window.open).toHaveBeenCalledWith(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "FBwindow",
      expect.stringContaining("noopener")
    );
  });

  it("uses correct popup dimensions", async () => {
    const user = userEvent.setup();
    render(<FacebookIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    const features = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][2];
    expect(features).toContain("width=650");
    expect(features).toContain("height=450");
  });
});
