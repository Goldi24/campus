import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import Dashboard from "../src/pages/Dashboard";

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe("Dashboard Component", () => {
  test("renders dashboard heading", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /dashboard/i,
      })
    ).toBeInTheDocument();
  });
});