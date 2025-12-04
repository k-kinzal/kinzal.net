import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Copyright } from "./Copyright";

describe("Copyright", () => {
  it("renders copyright text with current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Copyright />);

    expect(screen.getByText(new RegExp(`© 2005-${currentYear}, kinzal\\.net`))).toBeInTheDocument();
  });

  it("displays the start year 2005", () => {
    render(<Copyright />);

    expect(screen.getByText(/2005-/)).toBeInTheDocument();
  });
});
