import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Text } from "./Text";

describe("Text", () => {
  it("renders children correctly", () => {
    render(<Text>Test text</Text>);
    expect(screen.getByText("Test text")).toBeInTheDocument();
  });

  it("renders as p element by default", () => {
    render(<Text>Paragraph</Text>);
    expect(screen.getByText("Paragraph").tagName).toBe("P");
  });

  it("can render as span", () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("applies default size class", () => {
    render(<Text>Text</Text>);
    expect(screen.getByText("Text")).toHaveClass("text-base");
  });

  it("applies size variant", () => {
    render(<Text size="sm">Small text</Text>);
    expect(screen.getByText("Small text")).toHaveClass("text-sm");
  });

  it("applies muted variant", () => {
    render(<Text variant="muted">Muted text</Text>);
    expect(screen.getByText("Muted text")).toHaveClass("text-foreground-muted");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Text ref={ref}>Text</Text>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it("accepts custom className", () => {
    render(<Text className="custom-class">Text</Text>);
    expect(screen.getByText("Text")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text>Body text content</Text>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
