import { render, screen } from "@/test-utils";
import Home from "./page";

describe("Home", () => {
  it("renders home page", () => {
    render(<Home />);

    const heading = screen.getByRole("main");

    expect(heading).toHaveTextContent("Home");
  });
});
