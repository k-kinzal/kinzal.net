import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renders with href correctly", () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
    expect(link).toHaveTextContent("About");
  });

  it("applies primary variant by default", () => {
    render(<Link href="#">Primary</Link>);
    expect(screen.getByRole("link")).toHaveClass("text-primary");
  });

  it("applies secondary variant styles", () => {
    render(
      <Link href="#" variant="secondary">
        Secondary
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("text-foreground-muted");
  });

  it("applies ghost variant styles", () => {
    render(
      <Link href="#" variant="ghost">
        Ghost
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("text-foreground");
  });

  it("applies nav variant styles", () => {
    render(
      <Link href="#" variant="nav">
        Nav
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("hover:bg-background-muted");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <Link href="#" size="sm">
        Small
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("text-sm");

    rerender(
      <Link href="#" size="md">
        Medium
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("text-base");

    rerender(
      <Link href="#" size="lg">
        Large
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("text-lg");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Link ref={ref} href="#">
        Link
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("accepts custom className", () => {
    render(
      <Link href="#" className="font-bold">
        Custom
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("font-bold");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Link href="/about">About Us</Link>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
