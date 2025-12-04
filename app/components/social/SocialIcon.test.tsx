import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialIcon } from "./SocialIcon";

describe("SocialIcon", () => {
  const defaultProps = {
    url: "https://example.com/share",
    windowName: "testwindow",
    popupWidth: 500,
    popupHeight: 400,
    ariaLabel: "Share on Test",
    bgColor: "bg-blue-500",
    hoverBgColor: "hover:bg-blue-600",
    children: <span data-testid="icon">Icon</span>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders button with aria-label", () => {
    render(<SocialIcon {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Share on Test" })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<SocialIcon {...defaultProps} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("opens popup on click", async () => {
    const user = userEvent.setup();
    render(<SocialIcon {...defaultProps} />);

    await user.click(screen.getByRole("button"));

    expect(window.open).toHaveBeenCalledWith(
      defaultProps.url,
      defaultProps.windowName,
      expect.stringContaining("noopener")
    );
  });

  it("includes popup dimensions in window features", async () => {
    const user = userEvent.setup();
    render(<SocialIcon {...defaultProps} />);

    await user.click(screen.getByRole("button"));

    const features = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][2];
    expect(features).toContain("width=500");
    expect(features).toContain("height=400");
  });
});
