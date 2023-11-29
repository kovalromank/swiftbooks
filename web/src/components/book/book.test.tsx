import { render, screen } from "@/test-utils";
import { Book } from "./book";

describe("Book", () => {
  it("renders a book", () => {
    render(<Book />);

    expect(screen.getByText("Morgan Housel")).toBeInTheDocument();
    expect(screen.getByText("The Psychology of Money")).toBeInTheDocument();
    expect(screen.getByText("$24.99")).toBeInTheDocument();
    expect(screen.getByText("add to cart", { exact: false })).toBeInTheDocument();
  });
});
