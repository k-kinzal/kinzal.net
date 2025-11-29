import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { TabList, TabItem, TabPillItem } from "./Tabs";

describe("TabList", () => {
  it("renders with tablist role", () => {
    render(
      <TabList>
        <TabItem>Tab 1</TabItem>
      </TabList>
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(
      <TabList data-testid="tablist">
        <TabItem>Tab</TabItem>
      </TabList>
    );
    expect(screen.getByTestId("tablist")).toHaveClass("border-b");
  });

  it("applies pills variant styles", () => {
    render(
      <TabList variant="pills" data-testid="tablist">
        <TabPillItem>Tab</TabPillItem>
      </TabList>
    );
    expect(screen.getByTestId("tablist")).toHaveClass("gap-2");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <TabList ref={ref}>
        <TabItem>Tab</TabItem>
      </TabList>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("TabItem", () => {
  it("renders as button with tab role", () => {
    render(<TabItem>Tab</TabItem>);
    expect(screen.getByRole("tab")).toBeInTheDocument();
  });

  it("sets aria-selected when active", () => {
    render(<TabItem active>Active Tab</TabItem>);
    expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true");
  });

  it("applies active styles", () => {
    render(<TabItem active>Active</TabItem>);
    expect(screen.getByRole("tab")).toHaveClass("border-primary");
  });

  it("applies inactive styles", () => {
    render(<TabItem>Inactive</TabItem>);
    expect(screen.getByRole("tab")).toHaveClass("text-foreground-muted");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<TabItem ref={ref}>Tab</TabItem>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("TabPillItem", () => {
  it("applies pill styles when active", () => {
    render(<TabPillItem active>Active</TabPillItem>);
    expect(screen.getByRole("tab")).toHaveClass("bg-primary", "rounded-full");
  });

  it("applies inactive pill styles", () => {
    render(<TabPillItem>Inactive</TabPillItem>);
    expect(screen.getByRole("tab")).toHaveClass("rounded-full");
  });
});

describe("Tabs accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <TabList>
        <TabItem active>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem>Tab 3</TabItem>
      </TabList>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Tabs keyboard navigation", () => {
  it("navigates to next tab with ArrowRight", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem active>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
  });

  it("navigates to previous tab with ArrowLeft", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem active>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[1].focus();
    await user.keyboard("{ArrowLeft}");
    expect(tabs[0]).toHaveFocus();
  });

  it("wraps to first tab when pressing ArrowRight on last tab", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem active>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[2].focus();
    await user.keyboard("{ArrowRight}");
    expect(tabs[0]).toHaveFocus();
  });

  it("wraps to last tab when pressing ArrowLeft on first tab", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem active>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    await user.keyboard("{ArrowLeft}");
    expect(tabs[2]).toHaveFocus();
  });

  it("navigates to first tab with Home key", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem active>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[2].focus();
    await user.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();
  });

  it("navigates to last tab with End key", async () => {
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem active>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
        <TabItem>Tab 3</TabItem>
      </TabList>
    );

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    await user.keyboard("{End}");
    expect(tabs[2]).toHaveFocus();
  });

  it("calls onClick when tab is clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <TabList>
        <TabItem onClick={handleClick}>Tab 1</TabItem>
        <TabItem>Tab 2</TabItem>
      </TabList>
    );

    await user.click(screen.getAllByRole("tab")[0]);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
