import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageGallery } from "./ImageGallery";

describe("ImageGallery", () => {
  const defaultProps = {
    images: ["img001.jpg", "img002.jpg"],
    category: "original" as const,
  };

  beforeEach(() => {
    // Reset location hash
    window.location.hash = "";
  });

  it("renders thumbnail grid", () => {
    render(<ImageGallery {...defaultProps} />);

    expect(screen.getByTestId("thumbnail-grid")).toBeInTheDocument();
  });

  it("renders image viewers for each image", () => {
    render(<ImageGallery {...defaultProps} />);

    const viewers = screen.getAllByTestId("image-viewer");
    expect(viewers).toHaveLength(2);
  });

  it("sets correct ids on image viewers", () => {
    render(<ImageGallery {...defaultProps} />);

    const viewers = screen.getAllByTestId("image-viewer");
    expect(viewers[0]).toHaveAttribute("id", "img001.jpg");
    expect(viewers[1]).toHaveAttribute("id", "img002.jpg");
  });

  it("renders empty when no images provided", () => {
    render(<ImageGallery images={[]} category="original" />);

    expect(screen.getByTestId("thumbnail-grid")).toBeInTheDocument();
    expect(screen.queryAllByTestId("image-viewer")).toHaveLength(0);
  });

  it("re-triggers hash on mount when hash exists", () => {
    window.location.hash = "#img001.jpg";

    vi.useFakeTimers();
    render(<ImageGallery {...defaultProps} />);

    // After requestAnimationFrame
    vi.runAllTimers();

    expect(window.location.hash).toBe("#img001.jpg");
    vi.useRealTimers();
  });
});
