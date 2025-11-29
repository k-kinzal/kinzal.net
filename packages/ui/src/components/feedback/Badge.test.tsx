import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge")).toHaveClass("rounded-full");
  });

  it("applies primary variant", () => {
    render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText("Primary")).toHaveClass("bg-primary");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border");
  });

  it("applies size classes", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("text-xs");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("accepts custom className", () => {
    render(<Badge className="custom-class">Badge</Badge>);
    expect(screen.getByText("Badge")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Status</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
