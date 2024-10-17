import React from "react";
import { Button, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";

const page = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface" className="mt-5">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Created On
            </TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, createdAt, title, description, status }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">{status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default page;
