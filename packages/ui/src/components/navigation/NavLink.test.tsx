import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("renders link correctly", () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("About");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies base styling", () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("applies active styles when active", () => {
    render(
      <NavLink href="/about" active>
        About
      </NavLink>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("bg-background-muted");
  });

  it("applies inactive styles when not active", () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-foreground-muted");
  });

  it("sets aria-current when active", () => {
    render(
      <NavLink href="/about" active>
        About
      </NavLink>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when inactive", () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <NavLink ref={ref} href="/about">
        About
      </NavLink>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("accepts custom className for sizing", () => {
    render(
      <NavLink href="/about" className="px-4 py-2">
        About
      </NavLink>
    );
    expect(screen.getByRole("link")).toHaveClass("px-4", "py-2");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <NavLink href="/about" active>
        About
      </NavLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
