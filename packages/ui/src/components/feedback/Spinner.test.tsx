import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("accepts custom label", () => {
    render(<Spinner label="Processing..." />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Processing...");
  });

  it("has screen reader text", () => {
    render(<Spinner label="Loading data" />);
    expect(screen.getByText("Loading data")).toHaveClass("sr-only");
  });

  it("applies size classes", () => {
    render(<Spinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("h-8", "w-8");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(<Spinner className="custom-class" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
