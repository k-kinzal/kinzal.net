import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders children correctly", () => {
    render(
      <Stack>
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("applies flex class", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId("stack")).toHaveClass("flex");
  });

  it("applies vertical direction by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId("stack")).toHaveClass("flex-col");
  });

  it("applies horizontal direction", () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("flex-row");
  });

  it("applies gap classes correctly", () => {
    const { rerender } = render(
      <Stack gap="none" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-0");

    rerender(
      <Stack gap="xs" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-1");

    rerender(
      <Stack gap="sm" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-2");

    rerender(
      <Stack gap="md" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-4");

    rerender(
      <Stack gap="lg" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-6");

    rerender(
      <Stack gap="xl" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-8");
  });

  it("applies align classes correctly", () => {
    const { rerender } = render(
      <Stack align="start" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("items-start");

    rerender(
      <Stack align="center" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("items-center");

    rerender(
      <Stack align="end" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("items-end");

    rerender(
      <Stack align="stretch" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("items-stretch");
  });

  it("applies justify classes correctly", () => {
    const { rerender } = render(
      <Stack justify="start" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-start");

    rerender(
      <Stack justify="center" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-center");

    rerender(
      <Stack justify="end" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-end");

    rerender(
      <Stack justify="between" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-between");

    rerender(
      <Stack justify="around" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-around");
  });

  it("applies wrap when enabled", () => {
    render(
      <Stack wrap data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("flex-wrap");
  });

  it("does not apply wrap by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId("stack")).not.toHaveClass("flex-wrap");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Stack ref={ref}>Content</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack direction="horizontal" gap="md">
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
