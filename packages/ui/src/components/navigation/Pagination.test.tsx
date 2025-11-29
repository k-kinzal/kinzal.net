import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Pagination, PaginationItem, PaginationEllipsis } from "./Pagination";

describe("Pagination", () => {
  it("renders navigation element", () => {
    render(
      <Pagination>
        <PaginationItem>1</PaginationItem>
      </Pagination>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has aria-label for accessibility", () => {
    render(
      <Pagination>
        <PaginationItem>1</PaginationItem>
      </Pagination>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Pagination"
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Pagination ref={ref}>
        <PaginationItem>1</PaginationItem>
      </Pagination>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("PaginationItem", () => {
  it("renders as button", () => {
    render(<PaginationItem>1</PaginationItem>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("sets aria-current when active", () => {
    render(<PaginationItem active>1</PaginationItem>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-current", "page");
  });

  it("applies active styles", () => {
    render(<PaginationItem active>1</PaginationItem>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("applies disabled styles", () => {
    render(<PaginationItem disabled>Prev</PaginationItem>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<PaginationItem ref={ref}>1</PaginationItem>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("PaginationEllipsis", () => {
  it("renders ellipsis text", () => {
    render(<PaginationEllipsis />);
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<PaginationEllipsis ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe("Pagination accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Pagination>
        <PaginationItem disabled>Previous</PaginationItem>
        <PaginationItem active>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>10</PaginationItem>
        <PaginationItem>Next</PaginationItem>
      </Pagination>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
