import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders children correctly", () => {
    render(
      <Popover content={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Open");
  });

  it("shows popover on click", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toHaveTextContent("Popover content");
  });

  it("hides popover on second click", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on click outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover content={<div>Popover content</div>}>
          <button>Open</button>
        </Popover>
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText("Outside"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("does not close on click outside when closeOnClickOutside is false", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover content={<div>Popover content</div>} closeOnClickOutside={false}>
          <button>Open</button>
        </Popover>
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText("Outside"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("does not close on Escape when closeOnEscape is false", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Popover content</div>} closeOnEscape={false}>
        <button>Open</button>
      </Popover>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("works in controlled mode", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Popover
        content={<div>Popover content</div>}
        open={false}
        onOpenChange={onOpenChange}
      >
        <button>Open</button>
      </Popover>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Popover
        content={<div>Popover content</div>}
        open={true}
        onOpenChange={onOpenChange}
      >
        <button>Open</button>
      </Popover>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("applies placement classes correctly", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Content</div>} placement="bottom-end">
        <button>Open</button>
      </Popover>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toHaveClass("right-0");
  });

  it("toggles dialog visibility on click", async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>Content</div>}>
        <button>Open</button>
      </Popover>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover content={<div>Popover content</div>} aria-label="Popover content">
        <button>Open</button>
      </Popover>
    );

    await user.click(screen.getByRole("button"));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
