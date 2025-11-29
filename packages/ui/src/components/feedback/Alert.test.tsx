import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children correctly", () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
  });

  it("has alert role", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies info variant by default", () => {
    render(<Alert>Info</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-status-info-text");
  });

  it("applies success variant", () => {
    render(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-status-success-text");
  });

  it("applies warning variant", () => {
    render(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-status-warning-text");
  });

  it("applies error variant", () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-status-error-text");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Alert>Important message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
