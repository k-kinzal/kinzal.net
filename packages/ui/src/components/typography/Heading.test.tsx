import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders children correctly", () => {
    render(<Heading>Test Heading</Heading>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders h2 by default", () => {
    render(<Heading>Heading</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders correct heading level", () => {
    render(<Heading level={1}>H1</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("applies size classes based on level", () => {
    render(<Heading level={1}>Heading</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("text-3xl");
  });

  it("allows independent size from level", () => {
    render(
      <Heading level={2} size="xs">
        Small H2
      </Heading>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("text-sm");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Heading ref={ref}>Heading</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it("accepts custom className", () => {
    render(<Heading className="custom-class">Heading</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Heading level={1}>Page Title</Heading>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
