import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { useRef } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

function TestWrapper({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return <ImagePlaceholder containerRef={ref} className={className} />;
}

describe("ImagePlaceholder", () => {
  it("renders div with background color", () => {
    const { container } = render(<TestWrapper />);

    const div = container.firstChild as HTMLElement;
    expect(div.tagName).toBe("DIV");
    expect(div.style.backgroundColor).toBe("var(--color-surface-secondary, #1a1a1a)");
  });

  it("applies className", () => {
    const { container } = render(<TestWrapper className="custom-class" />);

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("custom-class");
  });

  it("has square aspect ratio", () => {
    const { container } = render(<TestWrapper />);

    const div = container.firstChild as HTMLElement;
    expect(div.style.aspectRatio).toBe("1 / 1");
  });
});
