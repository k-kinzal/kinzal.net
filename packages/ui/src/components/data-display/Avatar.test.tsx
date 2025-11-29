import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders image when src is provided", () => {
    render(<Avatar src="/user.jpg" alt="User" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders fallback when no src", () => {
    render(<Avatar fallback="JD" alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies circle shape by default", () => {
    render(<Avatar src="/user.jpg" alt="User" />);
    expect(screen.getByRole("img")).toHaveClass("rounded-full");
  });

  it("applies square shape", () => {
    render(<Avatar src="/user.jpg" alt="User" shape="square" />);
    expect(screen.getByRole("img")).toHaveClass("rounded-md");
  });

  it("applies size classes", () => {
    render(<Avatar src="/user.jpg" alt="User" size="lg" />);
    expect(screen.getByRole("img")).toHaveClass("h-12", "w-12");
  });

  it("renders fallback with aria-label", () => {
    render(<Avatar fallback="AB" alt="Alice Brown" />);
    expect(screen.getByLabelText("Alice Brown")).toBeInTheDocument();
  });

  it("forwards ref correctly for image", () => {
    const ref = { current: null };
    render(<Avatar ref={ref} src="/user.jpg" alt="User" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it("accepts custom className", () => {
    render(<Avatar src="/user.jpg" alt="User" className="custom-class" />);
    expect(screen.getByRole("img")).toHaveClass("custom-class");
  });

  it("has no accessibility violations with image", async () => {
    const { container } = render(<Avatar src="/user.jpg" alt="User" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with fallback", async () => {
    const { container } = render(<Avatar fallback="JD" alt="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
