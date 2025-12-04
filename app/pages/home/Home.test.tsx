import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component } from "./Home";

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

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.location.hash
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
    // Images should be reversed: img001, img002, img003
    expect(gallery.textContent).toBe("img001.jpgimg002.jpgimg003.jpg");
  });

  it("re-triggers hash for SSG compatibility when hash exists", async () => {
    // Set initial hash
    window.location.hash = "#img001.jpg";

    render(<Component />);

    // After effect, hash should be restored
    await vi.waitFor(() => {
      expect(window.location.hash).toBe("#img001.jpg");
    });
  });
});
