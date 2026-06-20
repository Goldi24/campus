import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import { describe, test, expect } from "vitest";

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /login/i })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });
});