import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveClass("bg-background", "shadow-sm");
  });

  it("applies outline variant", () => {
    render(
      <Card variant="outline" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("border");
  });

  it("applies ghost variant", () => {
    render(
      <Card variant="ghost" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("bg-transparent");
  });

  it("applies padding classes", () => {
    render(
      <Card padding="lg" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("p-6");
  });

  it("applies no padding when specified", () => {
    render(
      <Card padding="none" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId("card")).not.toHaveClass("p-4");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Card ref={ref}>Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(<Card className="custom-class">Card</Card>);
    expect(screen.getByText("Card").closest("div")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Card>Card content</Card>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Card.Header", () => {
  it("renders children correctly", () => {
    render(
      <Card padding="none">
        <Card.Header>Header content</Card.Header>
      </Card>
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies border classes", () => {
    render(
      <Card padding="none">
        <Card.Header data-testid="header">Header</Card.Header>
      </Card>
    );
    expect(screen.getByTestId("header")).toHaveClass("border-b");
  });
});

describe("Card.Body", () => {
  it("renders children correctly", () => {
    render(
      <Card padding="none">
        <Card.Body>Body content</Card.Body>
      </Card>
    );
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("applies padding classes", () => {
    render(
      <Card padding="none">
        <Card.Body data-testid="body">Body</Card.Body>
      </Card>
    );
    expect(screen.getByTestId("body")).toHaveClass("p-4");
  });
});

describe("Card.Footer", () => {
  it("renders children correctly", () => {
    render(
      <Card padding="none">
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies border and flex classes", () => {
    render(
      <Card padding="none">
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>
    );
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("border-t", "flex");
  });
});

describe("Card compound", () => {
  it("renders all compound components together", async () => {
    const { container } = render(
      <Card padding="none">
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
