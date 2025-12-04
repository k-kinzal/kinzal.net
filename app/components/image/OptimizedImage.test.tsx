import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OptimizedImage } from "./OptimizedImage";

describe("OptimizedImage", () => {
  const defaultProps = {
    category: "original" as const,
    filename: "img001.jpg",
    variant: "thumb-md" as const,
  };

  it("renders placeholder initially", () => {
    const { container } = render(<OptimizedImage {...defaultProps} />);

    // Initially renders placeholder div
    const placeholder = container.firstChild as HTMLElement;
    expect(placeholder.tagName).toBe("DIV");
  });

  it("applies className to placeholder", () => {
    const { container } = render(<OptimizedImage {...defaultProps} className="custom-class" />);

    const placeholder = container.firstChild as HTMLElement;
    expect(placeholder).toHaveClass("custom-class");
  });

  it("renders with different category", () => {
    const { container } = render(<OptimizedImage {...defaultProps} category="scrap" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with full variant", () => {
    const { container } = render(<OptimizedImage {...defaultProps} variant="full" />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
