import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "A summary of project issues.",
};

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" align="baseline">
      <Flex direction="column" gap="4">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <Flex>
        <LatestIssues />
      </Flex>
    </Grid>
  );
}
