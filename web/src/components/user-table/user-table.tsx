"use client";

import { FC } from "react";
import { Checkbox, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
import cx from "clsx";

import { useUsers } from "@/api/api";

import classes from "./user-table.module.css";

export const UserTable: FC = () => {
  const { data: users } = useUsers();

  const rows = !users
    ? null
    : users.map(({ id, username, email, status, active }) => (
        <TableTr key={id} className={cx({ [classes.disabled]: status === "admin" })}>
          <TableTd>{username}</TableTd>
          <TableTd>{email}</TableTd>
          <TableTd>
            <div className={classes.center}>
              <Checkbox
                checked={status === "manager" || status === "admin"}
                name="manager"
                disabled={status === "admin"}
                readOnly
              />
            </div>
          </TableTd>
          <TableTd>
            <div className={classes.center}>
              <Checkbox checked={active} name="active" disabled={status === "admin"} readOnly />
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
