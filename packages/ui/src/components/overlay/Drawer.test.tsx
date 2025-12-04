import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose } from "./Drawer";

describe("Drawer", () => {
  it("renders when open", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Drawer open={false} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={onOpenChange}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    // Click the overlay (first child with bg-black/50 class)
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    await user.click(overlay!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close on overlay click when closeOnOverlayClick is false", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={onOpenChange} closeOnOverlayClick={false}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const overlay = document.querySelector('[aria-hidden="true"]');
    await user.click(overlay!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("calls onOpenChange when Escape is pressed", async () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={onOpenChange}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close on Escape when closeOnEscape is false", async () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={onOpenChange} closeOnEscape={false}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders without overlay when overlay is false", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}} overlay={false}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeInTheDocument();
  });

  it("applies side variants correctly", () => {
    const { rerender } = render(
      <Drawer open={true} onOpenChange={() => {}} side="right">
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const content = screen.getByText("Content").parentElement;
    expect(content).toHaveClass("right-0");

    rerender(
      <Drawer open={true} onOpenChange={() => {}} side="left">
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(content).toHaveClass("left-0");

    rerender(
      <Drawer open={true} onOpenChange={() => {}} side="top">
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(content).toHaveClass("top-0");

    rerender(
      <Drawer open={true} onOpenChange={() => {}} side="bottom">
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(content).toHaveClass("bottom-0");
  });

  it("locks body scroll when open", () => {
    const { rerender } = render(
      <Drawer open={false} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(document.body.style.overflow).toBe("");

    rerender(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Drawer open={false} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("has correct aria attributes", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-state", "open");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Drawer open={true} onOpenChange={() => {}} aria-label="Test Drawer">
        <DrawerHeader>
          <DrawerTitle>Test Drawer</DrawerTitle>
          <DrawerClose aria-label="Close" />
        </DrawerHeader>
        <DrawerBody>Content goes here</DrawerBody>
        <DrawerFooter>
          <button>Action</button>
        </DrawerFooter>
      </Drawer>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DrawerHeader", () => {
  it("renders children correctly", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerHeader>Header Content</DrawerHeader>
      </Drawer>
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });
});

describe("DrawerTitle", () => {
  it("renders as h2 element", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerHeader>
      </Drawer>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Title");
  });
});

describe("DrawerBody", () => {
  it("renders children correctly", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerBody>Body Content</DrawerBody>
      </Drawer>
    );

    expect(screen.getByText("Body Content")).toBeInTheDocument();
  });
});

describe("DrawerFooter", () => {
  it("renders children correctly", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerFooter>Footer Content</DrawerFooter>
      </Drawer>
    );

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});

describe("DrawerClose", () => {
  it("renders close button", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerHeader>
          <DrawerClose />
        </DrawerHeader>
      </Drawer>
    );

    expect(screen.getByLabelText("Close drawer")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerHeader>
          <DrawerClose onClick={onClose} />
        </DrawerHeader>
      </Drawer>
    );

    await user.click(screen.getByLabelText("Close drawer"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("uses custom aria-label", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerHeader>
          <DrawerClose aria-label="Close settings" />
        </DrawerHeader>
      </Drawer>
    );

    expect(screen.getByLabelText("Close settings")).toBeInTheDocument();
  });
});
