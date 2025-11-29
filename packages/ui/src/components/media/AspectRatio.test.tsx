import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children correctly", () => {
    render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies square ratio by default", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveClass("aspect-square");
  });

  it("applies video ratio", () => {
    render(
      <AspectRatio ratio="video" data-testid="ratio">
        Content
      </AspectRatio>
    );
    expect(screen.getByTestId("ratio")).toHaveClass("aspect-video");
  });

  it("applies portrait ratio", () => {
    render(
      <AspectRatio ratio="portrait" data-testid="ratio">
        Content
      </AspectRatio>
    );
    expect(screen.getByTestId("ratio")).toHaveClass("aspect-[3/4]");
  });

  it("applies wide ratio", () => {
    render(
      <AspectRatio ratio="wide" data-testid="ratio">
        Content
      </AspectRatio>
    );
    expect(screen.getByTestId("ratio")).toHaveClass("aspect-[21/9]");
  });

  it("applies overflow-hidden class", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveClass("overflow-hidden");
  });

  it("applies relative positioning", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveClass("relative");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<AspectRatio ref={ref}>Content</AspectRatio>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts custom className", () => {
    render(
      <AspectRatio className="bg-gray-100" data-testid="ratio">
        Content
      </AspectRatio>
    );
    expect(screen.getByTestId("ratio")).toHaveClass("bg-gray-100");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AspectRatio ratio="video">
        <div>Video content</div>
      </AspectRatio>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
