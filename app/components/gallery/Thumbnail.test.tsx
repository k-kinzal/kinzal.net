import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Thumbnail } from "./Thumbnail";

describe("Thumbnail", () => {
  const defaultProps = {
    filename: "img001.jpg",
    category: "original" as const,
    onSelect: vi.fn(),
  };

  it("renders link to image viewer", () => {
    render(<Thumbnail {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#img001.jpg");
  });

  it("calls onSelect with filename when clicked", () => {
    const onSelect = vi.fn();
    render(<Thumbnail {...defaultProps} onSelect={onSelect} />);

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(onSelect).toHaveBeenCalledWith("img001.jpg");
  });

  it("renders with scrap category", () => {
    render(<Thumbnail {...defaultProps} category="scrap" />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
