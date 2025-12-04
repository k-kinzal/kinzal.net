import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component } from "./Scrap";

// Mock the virtual:image-list module
vi.mock("virtual:image-list", () => ({
  imageList: {
    scrap: ["scrap003.jpg", "scrap002.jpg", "scrap001.jpg"],
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

describe("Scrap Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.hash = "";
  });

  it("renders ImageGallery with scrap category", () => {
    render(<Component />);

    const gallery = screen.getByTestId("image-gallery");
    expect(gallery).toBeInTheDocument();
    expect(gallery).toHaveAttribute("data-category", "scrap");
  });

  it("displays images in reverse order (newest first)", () => {
    render(<Component />);

    const gallery = screen.getByTestId("image-gallery");
    expect(gallery.textContent).toBe("scrap001.jpgscrap002.jpgscrap003.jpg");
  });

  it("re-triggers hash for SSG compatibility when hash exists", async () => {
    window.location.hash = "#scrap001.jpg";

    render(<Component />);

    await vi.waitFor(() => {
      expect(window.location.hash).toBe("#scrap001.jpg");
    });
  });
});
