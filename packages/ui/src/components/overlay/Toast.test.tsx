import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  Toast,
  ToastProvider,
  ToastContainer,
  useToast,
} from "./Toast";

// Test component to use the useToast hook
function ToastTrigger() {
  const { addToast, removeAllToasts } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          addToast({ title: "Test Toast", description: "Test description" })
        }
      >
        Add Toast
      </button>
      <button
        onClick={() =>
          addToast({
            title: "Success",
            variant: "success",
            duration: 1000,
          })
        }
      >
        Add Success Toast
      </button>
      <button onClick={removeAllToasts}>Clear All</button>
    </div>
  );
}

describe("Toast", () => {
  it("renders title and description", () => {
    render(
      <Toast title="Test Title" description="Test description" />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Toast title="Default" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<Toast title="Success" variant="success" />);
    expect(screen.getByRole("alert")).toHaveClass("border-l-green-500");

    rerender(<Toast title="Error" variant="error" />);
    expect(screen.getByRole("alert")).toHaveClass("border-l-red-500");

    rerender(<Toast title="Warning" variant="warning" />);
    expect(screen.getByRole("alert")).toHaveClass("border-l-yellow-500");

    rerender(<Toast title="Info" variant="info" />);
    expect(screen.getByRole("alert")).toHaveClass("border-l-primary");
  });

  it("calls onDismiss when close button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Toast title="Test" onDismiss={onDismiss} />);

    await user.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("renders action when provided", () => {
    render(
      <Toast
        title="Test"
        action={<button>Undo</button>}
      />
    );

    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<Toast title="Test" open={false} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Toast title="Test" description="Description" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("ToastProvider and useToast", () => {
  it("throws error when useToast is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<ToastTrigger />);
    }).toThrow("useToast must be used within a ToastProvider");

    consoleSpy.mockRestore();
  });

  it("adds and displays toasts", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add Toast"));

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("removes toast after duration", async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider defaultDuration={1000}>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    const addButton = screen.getByText("Add Toast");
    act(() => {
      addButton.click();
    });

    expect(screen.getByText("Test Toast")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("removes toast when dismiss is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider defaultDuration={0}>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add Toast"));
    expect(screen.getByText("Test Toast")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Dismiss"));

    await waitFor(() => {
      expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
    });
  });

  it("removes all toasts", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider defaultDuration={0}>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add Toast"));
    await user.click(screen.getByText("Add Success Toast"));

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();

    await user.click(screen.getByText("Clear All"));

    await waitFor(() => {
      expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
      expect(screen.queryByText("Success")).not.toBeInTheDocument();
    });
  });

  it("respects maxToasts limit", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider maxToasts={2} defaultDuration={0}>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add Toast"));
    await user.click(screen.getByText("Add Toast"));
    await user.click(screen.getByText("Add Success Toast"));

    // Only 2 toasts should be visible (the oldest removed)
    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(2);
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("applies variant correctly from addToast", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider defaultDuration={0}>
        <ToastTrigger />
        <ToastContainer />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add Success Toast"));

    const toast = screen.getByRole("alert");
    expect(toast).toHaveClass("border-l-green-500");
  });
});

describe("ToastContainer", () => {
  it("renders in different positions", () => {
    const { rerender } = render(
      <ToastProvider>
        <ToastContainer position="top-right" data-testid="container" />
      </ToastProvider>
    );

    expect(screen.getByTestId("container")).toHaveClass("top-0", "right-0");

    rerender(
      <ToastProvider>
        <ToastContainer position="bottom-left" data-testid="container" />
      </ToastProvider>
    );

    expect(screen.getByTestId("container")).toHaveClass("bottom-0", "left-0");

    rerender(
      <ToastProvider>
        <ToastContainer position="top-center" data-testid="container" />
      </ToastProvider>
    );

    expect(screen.getByTestId("container")).toHaveClass("top-0", "-translate-x-1/2");
  });
});
