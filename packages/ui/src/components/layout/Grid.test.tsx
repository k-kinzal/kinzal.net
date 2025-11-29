import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children in grid", () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies correct column classes", () => {
    const { rerender } = render(
      <Grid cols={1} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-1");

    rerender(
      <Grid cols={2} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-2");

    rerender(
      <Grid cols={3} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-3");

    rerender(
      <Grid cols={4} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-4");

    rerender(
      <Grid cols={6} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-6");

    rerender(
      <Grid cols={12} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-12");
  });

  it("applies correct gap classes", () => {
    const { rerender } = render(
      <Grid gap="none" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-0");

    rerender(
      <Grid gap="xs" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-1");

    rerender(
      <Grid gap="sm" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-2");

    rerender(
      <Grid gap="md" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-4");

    rerender(
      <Grid gap="lg" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-6");

    rerender(
      <Grid gap="xl" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-8");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(
      <Grid className="min-h-screen" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("min-h-screen");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid cols={3}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
