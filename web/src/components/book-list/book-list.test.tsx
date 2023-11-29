import { render, screen } from "@/test-utils";
import { BookList } from "./book-list";

describe("BookList", () => {
  it("renders a book list", () => {
    render(<BookList />);

    expect(screen.getByText("Stacy Bob")).toBeInTheDocument();
    expect(screen.getByText("Great reads 1")).toBeInTheDocument();
    expect(screen.getByText("Books: 5")).toBeInTheDocument();
    expect(screen.getByText("Pages: 1204")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/view/i);
  });
});
