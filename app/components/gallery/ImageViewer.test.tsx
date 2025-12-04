import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageViewer } from "./ImageViewer";

describe("ImageViewer", () => {
  const defaultProps = {
    id: "test-image",
    category: "original" as const,
    filename: "img001.jpg",
    isSelected: false,
    onClose: vi.fn(),
  };

  it("renders with data-testid", () => {
    render(<ImageViewer {...defaultProps} />);

    expect(screen.getByTestId("image-viewer")).toBeInTheDocument();
  });

  it("sets the correct id attribute", () => {
    render(<ImageViewer {...defaultProps} />);

    const viewer = screen.getByTestId("image-viewer");
    expect(viewer).toHaveAttribute("id", "test-image");
  });

  it("contains a close link pointing to #", () => {
    render(<ImageViewer {...defaultProps} />);

    const closeLink = screen.getByRole("link");
    expect(closeLink).toHaveAttribute("href", "#");
  });

  it("renders with off-screen positioning when not selected", () => {
    render(<ImageViewer {...defaultProps} isSelected={false} />);

    const viewer = screen.getByTestId("image-viewer");
    expect(viewer).toHaveClass("-left-full");
  });

  it("renders with on-screen positioning when selected", () => {
    render(<ImageViewer {...defaultProps} isSelected={true} />);

    const viewer = screen.getByTestId("image-viewer");
    expect(viewer).toHaveClass("left-0");
    expect(viewer).toHaveClass("z-overlay");
  });

  it("calls onClose when link is clicked", () => {
    const onClose = vi.fn();
    render(<ImageViewer {...defaultProps} onClose={onClose} />);

    const closeLink = screen.getByRole("link");
    fireEvent.click(closeLink);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders with scrap category", () => {
    render(<ImageViewer {...defaultProps} category="scrap" filename="img001.png" />);

    expect(screen.getByTestId("image-viewer")).toBeInTheDocument();
  });
});
