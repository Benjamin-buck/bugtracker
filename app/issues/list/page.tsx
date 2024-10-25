import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { columnNames, IssueQuery } from "./IssueTable";
import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";

const page = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
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
      <IssueTable searchParams={searchParams} issues={issues} />
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
