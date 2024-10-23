import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "@/app/components/Link";
import IssueActions from "./IssueActions";
import { date } from "zod";
import { issueSchema } from "@/app/ValidationSchema";
import { sort } from "fast-sort";
import { Issue, Status } from "@prisma/client";

const page = async ({ searchParams }: { searchParams: { status: Status } }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface" className="mt-5" size="3">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell width="60%">Issue</TableColumnHeaderCell>
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

export const dynamic = "force-dynamic";

export default page;
