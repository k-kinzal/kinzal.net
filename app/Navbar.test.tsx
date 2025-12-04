import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  const renderWithRouter = (initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Navbar />
      </MemoryRouter>
    );
  };

  it("renders brand link", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: "RakugakiYa" })).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: "Original" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Scrap" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About me" })).toBeInTheDocument();
  });

  it("renders header element", () => {
    renderWithRouter();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
