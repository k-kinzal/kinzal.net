import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GooglePlusIcon } from "./GooglePlusIcon";

describe("GooglePlusIcon", () => {
  const shareUrl = "https://example.com";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Google+ share button", () => {
    render(<GooglePlusIcon shareUrl={shareUrl} />);

    expect(screen.getByRole("button", { name: "Share on Google+" })).toBeInTheDocument();
  });

  it("opens Google+ popup with constructed URL", async () => {
    const user = userEvent.setup();
    render(<GooglePlusIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    expect(window.open).toHaveBeenCalledWith(
      `https://plus.google.com/share?url=${encodeURIComponent(shareUrl)}`,
      "GPwindow",
      expect.stringContaining("noopener")
    );
  });

  it("uses correct popup dimensions", async () => {
    const user = userEvent.setup();
    render(<GooglePlusIcon shareUrl={shareUrl} />);

    await user.click(screen.getByRole("button"));

    const features = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][2];
    expect(features).toContain("width=600");
    expect(features).toContain("height=600");
  });
});
