import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "@/app/components/Link";
import IssueActions from "./IssueActions";
import { date } from "zod";
import { issueSchema } from "@/app/ValidationSchema";
import { sort } from "fast-sort";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const page = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}) => {
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

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // If no value is specified, or the page does not exist, value is set to 1
  const page = parseInt(searchParams.page) || 1;

  // Specifies the number of items per page.
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    // Number of records we should skip
    skip: (page - 1) * pageSize,

    // The number of records we want to fetch.
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
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
            ({
              id,
              createdAt,
              title,
              description,
              status,
              assignedToUserId,
            }) => (
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
