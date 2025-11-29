import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders navigation element", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has aria-label for accessibility", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Breadcrumb"
    );
  });

  it("renders separator between items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/about">About</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("renders custom separator", () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/about">About</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText(">")).toBeInTheDocument();
  });
});

describe("BreadcrumbItem", () => {
  it("renders as link when not current", () => {
    render(<BreadcrumbItem href="/">Home</BreadcrumbItem>);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders as span when current", () => {
    render(<BreadcrumbItem current>Current Page</BreadcrumbItem>);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("sets aria-current for current page", () => {
    render(<BreadcrumbItem current>Current</BreadcrumbItem>);
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/gallery">Gallery</BreadcrumbItem>
        <BreadcrumbItem current>Artwork</BreadcrumbItem>
      </Breadcrumb>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
