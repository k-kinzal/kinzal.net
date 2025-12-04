import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders children correctly", () => {
    render(<IconButton aria-label="Test">*</IconButton>);
    expect(screen.getByRole("button")).toHaveTextContent("*");
  });

  it("applies primary variant by default", () => {
    render(<IconButton aria-label="Test">*</IconButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("applies secondary variant styles", () => {
    render(
      <IconButton variant="secondary" aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toHaveClass("bg-background-muted");
  });

  it("applies ghost variant styles", () => {
    render(
      <IconButton variant="ghost" aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toHaveClass("hover:bg-background-muted");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <IconButton size="sm" aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toHaveClass("h-8", "w-8");

    rerender(
      <IconButton size="md" aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toHaveClass("h-10", "w-10");

    rerender(
      <IconButton size="lg" aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toHaveClass("h-12", "w-12");
  });

  it("can be disabled", () => {
    render(
      <IconButton disabled aria-label="Test">
        *
      </IconButton>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <IconButton ref={ref} aria-label="Test">
        *
      </IconButton>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies rounded-full for circular shape", () => {
    render(<IconButton aria-label="Test">*</IconButton>);
    expect(screen.getByRole("button")).toHaveClass("rounded-full");
  });

  it("renders without aria-label (warning is dev-only)", () => {
    // Warning is only shown in development mode (NODE_ENV === 'development')
    // In test environment, this should render without throwing
    render(<IconButton>*</IconButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has no accessibility violations with aria-label", async () => {
    const { container } = render(<IconButton aria-label="Share">*</IconButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
