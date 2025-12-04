import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Icon } from "./Icon";
import { Star } from "lucide-react";

describe("Icon", () => {
  it("renders icon correctly", () => {
    render(<Icon icon={Star} data-testid="icon" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies shrink-0 class by default", () => {
    render(<Icon icon={Star} data-testid="icon" />);
    expect(screen.getByTestId("icon")).toHaveClass("shrink-0");
  });

  it("applies aria-hidden by default for decorative icons", () => {
    render(<Icon icon={Star} data-testid="icon" />);
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts custom className", () => {
    render(<Icon icon={Star} className="text-primary h-8 w-8" data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("w-8", "h-8", "text-primary");
  });

  it("passes size prop to Lucide icon", () => {
    render(<Icon icon={Star} size={24} data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("has no accessibility violations (decorative icon)", async () => {
    const { container } = render(<Icon icon={Star} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
