import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders children correctly", () => {
    render(<Footer>Footer content</Footer>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("uses footer semantic element", () => {
    render(<Footer data-testid="footer">Content</Footer>);
    expect(screen.getByTestId("footer").tagName).toBe("FOOTER");
  });

  it("is static positioned by default", () => {
    render(<Footer data-testid="footer">Content</Footer>);
    const footer = screen.getByTestId("footer");
    expect(footer).not.toHaveClass("fixed");
    expect(footer).not.toHaveClass("sticky");
  });

  it("can be fixed positioned", () => {
    render(
      <Footer position="fixed" data-testid="footer">
        Content
      </Footer>
    );
    expect(screen.getByTestId("footer")).toHaveClass("fixed");
  });

  it("can be sticky positioned", () => {
    render(
      <Footer position="sticky" data-testid="footer">
        Content
      </Footer>
    );
    expect(screen.getByTestId("footer")).toHaveClass("sticky");
  });

  it("applies base classes", () => {
    render(<Footer data-testid="footer">Content</Footer>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("w-full");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Footer ref={ref}>Content</Footer>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("accepts custom className for sizing", () => {
    render(
      <Footer className="h-12 px-4" data-testid="footer">
        Content
      </Footer>
    );
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("h-12", "px-4");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Footer>© 2024 Site Name</Footer>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
