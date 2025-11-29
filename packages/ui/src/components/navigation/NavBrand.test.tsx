import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { NavBrand } from "./NavBrand";

describe("NavBrand", () => {
  it("renders children correctly", () => {
    render(<NavBrand href="/">Brand Name</NavBrand>);
    expect(screen.getByText("Brand Name")).toBeInTheDocument();
  });

  it("renders as link with href", () => {
    render(<NavBrand href="/">Brand</NavBrand>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies base styling", () => {
    render(<NavBrand href="/">Brand</NavBrand>);
    const brand = screen.getByRole("link");
    expect(brand).toHaveClass("inline-flex", "items-center");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <NavBrand ref={ref} href="/">
        Brand
      </NavBrand>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("accepts custom className for border styling", () => {
    render(
      <NavBrand href="/" className="border-l-4 border-l-primary pl-4">
        Brand
      </NavBrand>
    );
    const brand = screen.getByRole("link");
    expect(brand).toHaveClass("border-l-4", "border-l-primary", "pl-4");
  });

  it("accepts custom className for typography", () => {
    render(
      <NavBrand href="/" className="text-2xl font-bold">
        Brand
      </NavBrand>
    );
    const brand = screen.getByRole("link");
    expect(brand).toHaveClass("text-2xl", "font-bold");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NavBrand href="/">Site Name</NavBrand>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
