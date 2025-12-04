import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders footer element", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders social share buttons", () => {
    render(<Footer />);

    expect(screen.getByRole("button", { name: "Share on Twitter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share on Facebook" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share on Google+" })).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);

    expect(screen.getByText(/kinzal\.net/)).toBeInTheDocument();
  });
});
