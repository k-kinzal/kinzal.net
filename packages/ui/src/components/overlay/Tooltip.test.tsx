import { describe, it, expect, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Hover me");
  });

  it("shows tooltip on mouse enter after delay", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Hover me").parentElement!.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
    vi.useRealTimers();
  });

  it("hides tooltip on mouse leave", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Hover me").parentElement!.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(wrapper);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("shows tooltip on focus", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Focus me").parentElement!.parentElement!;

    act(() => {
      fireEvent.focus(wrapper);
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("hides tooltip on blur", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Focus me").parentElement!.parentElement!;

    act(() => {
      fireEvent.focus(wrapper);
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    act(() => {
      fireEvent.blur(wrapper);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("does not show tooltip when disabled", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={0} disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Hover me").parentElement!.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
      vi.advanceTimersByTime(100);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("applies placement classes correctly", async () => {
    vi.useFakeTimers();
    const { rerender } = render(
      <Tooltip content="Tooltip" placement="top" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Trigger").parentElement!.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toHaveClass("bottom-full");

    act(() => {
      fireEvent.mouseLeave(wrapper);
    });

    rerender(
      <Tooltip content="Tooltip" placement="bottom" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );

    act(() => {
      fireEvent.mouseEnter(wrapper);
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toHaveClass("top-full");
    vi.useRealTimers();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Tooltip content="Tooltip" ref={ref}>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Hover me").parentElement!.parentElement!;

    fireEvent.mouseEnter(wrapper);

    // Wait for the tooltip to appear (0ms delay)
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("respects custom delay", async () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Tooltip text" delay={500}>
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText("Hover me").parentElement!.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    vi.useRealTimers();
  });
});
