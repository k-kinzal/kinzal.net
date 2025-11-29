import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders as hr element", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider").tagName).toBe("HR");
  });

  it("applies horizontal styles by default", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("w-full", "border-t");
  });

  it("applies vertical styles", () => {
    render(<Divider orientation="vertical" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("h-full", "border-l");
  });

  it("applies dashed variant", () => {
    render(<Divider variant="dashed" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("border-dashed");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  it("accepts custom className", () => {
    render(<Divider className="my-4" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("my-4");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Divider />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
