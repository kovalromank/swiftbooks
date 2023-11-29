import { render, screen } from "@/test-utils";
import { UserTable } from "./user-table";

import { users } from "./users";

describe("UserTable", () => {
  it("renders a user table", () => {
    render(<UserTable />);

    users.forEach(({ name, email, manager, active }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });
});
