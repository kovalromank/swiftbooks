import { render, screen } from "@/test-utils";
import Home from "./page";

describe("Home", () => {
  it("renders home page", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
