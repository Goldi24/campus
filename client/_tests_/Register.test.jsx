import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import Register from "../src/pages/Register";

describe("Register Component", () => {
  test("renders register form", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText(/name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });
});