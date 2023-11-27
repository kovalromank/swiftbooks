import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./page";

describe("Home", () => {
  it("renders home page", () => {
    render(<Home />);

    const heading = screen.getByRole("main");

    expect(heading).toHaveTextContent("Home");
  });
});
