import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Navbar } from "./Navbar";
import { NavBrand } from "./NavBrand";
import { NavLink } from "./NavLink";

describe("Navbar", () => {
  it("renders children correctly", () => {
    render(
      <Navbar>
        <NavBrand href="/">Brand</NavBrand>
      </Navbar>
    );
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });

  it("uses header semantic element", () => {
    render(<Navbar data-testid="navbar">Content</Navbar>);
    expect(screen.getByTestId("navbar").tagName).toBe("HEADER");
  });

  it("is static positioned by default", () => {
    render(<Navbar data-testid="navbar">Content</Navbar>);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).not.toHaveClass("fixed");
    expect(navbar).not.toHaveClass("sticky");
  });

  it("can be fixed positioned", () => {
    render(
      <Navbar position="fixed" data-testid="navbar">
        Content
      </Navbar>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("fixed");
  });

  it("can be sticky positioned", () => {
    render(
      <Navbar position="sticky" data-testid="navbar">
        Content
      </Navbar>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("sticky");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Navbar ref={ref}>Content</Navbar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("accepts custom className", () => {
    render(
      <Navbar className="h-16 px-4" data-testid="navbar">
        Content
      </Navbar>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("h-16", "px-4");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Navbar>
        <NavBrand href="/">Site Name</NavBrand>
        <NavLink href="/" active>
          Home
        </NavLink>
        <NavLink href="/about">About</NavLink>
      </Navbar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
