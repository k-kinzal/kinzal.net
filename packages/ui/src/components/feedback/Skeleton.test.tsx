import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with default styles", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md");
  });

  it("applies circular variant", () => {
    render(<Skeleton variant="circular" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-full");
  });

  it("applies text variant", () => {
    render(<Skeleton variant="text" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-4");
  });

  it("applies custom width as number", () => {
    render(<Skeleton width={200} data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ width: "200px" });
  });

  it("applies custom width as string", () => {
    render(<Skeleton width="50%" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ width: "50%" });
  });

  it("applies custom height as number", () => {
    render(<Skeleton height={100} data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ height: "100px" });
  });

  it("applies custom height as string", () => {
    render(<Skeleton height="2rem" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ height: "2rem" });
  });

  it("has aria-hidden for accessibility", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("custom-class");
  });
});
