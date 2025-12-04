import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Image } from "./Image";

describe("Image", () => {
  it("renders with src and alt", () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test.jpg");
    expect(img).toHaveAttribute("alt", "Test image");
  });

  it("applies object-cover by default", () => {
    render(<Image src="/test.jpg" alt="Test" />);
    expect(screen.getByRole("img")).toHaveClass("object-cover");
  });

  it("applies objectFit classes correctly", () => {
    const { rerender } = render(<Image src="/test.jpg" alt="Test" objectFit="contain" />);
    expect(screen.getByRole("img")).toHaveClass("object-contain");

    rerender(<Image src="/test.jpg" alt="Test" objectFit="fill" />);
    expect(screen.getByRole("img")).toHaveClass("object-fill");

    rerender(<Image src="/test.jpg" alt="Test" objectFit="none" />);
    expect(screen.getByRole("img")).toHaveClass("object-none");

    rerender(<Image src="/test.jpg" alt="Test" objectFit="scale-down" />);
    expect(screen.getByRole("img")).toHaveClass("object-scale-down");
  });

  it("defaults to lazy loading", () => {
    render(<Image src="/test.jpg" alt="Test" />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
  });

  it("can override loading attribute", () => {
    render(<Image src="/test.jpg" alt="Test" loading="eager" />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Image ref={ref} src="/test.jpg" alt="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it("accepts custom className", () => {
    render(<Image src="/test.jpg" alt="Test" className="rounded-lg" />);
    expect(screen.getByRole("img")).toHaveClass("rounded-lg");
  });

  it("renders with empty alt (warning is dev-only)", () => {
    // Warning is only shown in development mode (NODE_ENV === 'development')
    // In test environment, this should render without throwing
    // Empty alt makes image decorative, so we use getByTestId instead of getByRole
    render(<Image src="/test.jpg" data-testid="decorative-image" />);
    expect(screen.getByTestId("decorative-image")).toBeInTheDocument();
  });

  it("has no accessibility violations with alt text", async () => {
    const { container } = render(
      <Image src="/photo.jpg" alt="A beautiful sunset over the ocean" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
