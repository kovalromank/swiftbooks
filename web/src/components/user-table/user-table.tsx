import { FC } from "react";
import { Checkbox, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";

import { users } from "./users";

import classes from "./user-table.module.css";

export const UserTable: FC = () => {
  const rows = users.map(({ name, email, manager, active }) => (
    <TableTr key={email}>
      <TableTd>{name}</TableTd>
      <TableTd>{email}</TableTd>
      <TableTd>
        <div className={classes.center}>
          <Checkbox checked={manager} name="manager" readOnly />
        </div>
      </TableTd>
      <TableTd>
        <div className={classes.center}>
          <Checkbox checked={active} name="active" readOnly />
        </div>
      </TableTd>
    </TableTr>
  ));

  return (
    <Table className={classes.table} highlightOnHover highlightOnHoverColor="gray.0">
      <TableThead className={classes.header}>
        <TableTr>
          <TableTh>Name</TableTh>
          <TableTh>Email</TableTh>
          <TableTh>
            <div className={classes.center}>Manager</div>
          </TableTh>
          <TableTh>
            <div className={classes.center}>Active</div>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody className={classes.body}>{rows}</TableTbody>
    </Table>
  );
};
