import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders brand name", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByText("RakugakiYa")).toBeInTheDocument();
  });

  it("links to home page", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "RakugakiYa" })).toHaveAttribute("href", "/");
  });
});
