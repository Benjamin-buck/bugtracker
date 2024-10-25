import prisma from "@/prisma/client";
import { Avatar, Button, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "./components/IssueStatusBadge";
import Link from "next/link";

const LatestIssues = async () => {
  // Prisma -- Get the latest issues
  // -- Order by latest creation date in desc order.
  // -- Take top 5 records
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card className="w-full">
      <Heading size="4" mb="5">
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button mt="4" mb="2" color="red" variant="soft">
        View All Issues
      </Button>
    </Card>
  );
};

export default LatestIssues;
