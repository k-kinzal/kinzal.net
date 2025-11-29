import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies max-width by default", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container")).toHaveClass("max-w-7xl");
  });

  it("removes max-width when fluid", () => {
    render(
      <Container fluid data-testid="container">
        Content
      </Container>
    );
    expect(screen.getByTestId("container")).not.toHaveClass("max-w-7xl");
  });

  it("applies base classes", () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("w-full", "mx-auto", "px-4");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(
      <Container className="bg-red-500" data-testid="container">
        Content
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("bg-red-500");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Container>Accessible Content</Container>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
