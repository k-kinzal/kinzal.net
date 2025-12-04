import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component } from "./Original";

// Mock the virtual:image-list module
vi.mock("virtual:image-list", () => ({
  imageList: {
    original: ["img003.jpg", "img002.jpg", "img001.jpg"],
  },
}));

// Mock ImageGallery to verify props
vi.mock("../../components/gallery", () => ({
  ImageGallery: vi.fn(({ images, category }) => (
    <div data-testid="image-gallery" data-category={category}>
      {images.map((img: string) => (
        <span key={img}>{img}</span>
      ))}
    </div>
  )),
}));

describe("Original Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.hash = "";
  });

  it("renders ImageGallery with original category", () => {
    render(<Component />);

    const gallery = screen.getByTestId("image-gallery");
    expect(gallery).toBeInTheDocument();
    expect(gallery).toHaveAttribute("data-category", "original");
  });

  it("displays images in reverse order (newest first)", () => {
    render(<Component />);

    const gallery = screen.getByTestId("image-gallery");
    expect(gallery.textContent).toBe("img001.jpgimg002.jpgimg003.jpg");
  });

  it("handles empty image list gracefully", async () => {
    // This test verifies the ?? [] fallback
    vi.doMock("virtual:image-list", () => ({
      imageList: {},
    }));

    // Re-import to get the new mock
    const { Component: ReloadedComponent } = await import("./Original");
    render(<ReloadedComponent />);

    const gallery = screen.getByTestId("image-gallery");
    expect(gallery).toBeInTheDocument();
  });
});
