import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface" className="mt-5" size="3">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, className, witdh }) => (
            <TableColumnHeaderCell
              key={label}
              className={className}
              width={witdh}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: value },
                }}
              >
                {label}
              </NextLink>
              {value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </TableColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(
          ({ id, createdAt, title, description, status, assignedToUserId }) => (
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
          )
        )}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
  witdh?: string;
}[] = [
  { label: "Issue", value: "title", witdh: "60%" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
