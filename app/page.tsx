import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const openCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const closedCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openCount}
          closed={closedCount}
          inProgress={inProgressCount}
        />
        <IssueChart
          open={openCount}
          closed={closedCount}
          inProgress={inProgressCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

//the big components does the importing of small components and we using them, they give them props
//the small components does exporting
//to use hooks, it has to be a client component

export const metadata: Metadata = {
  title: "Issue - Tracker - Dashboard",
  description: "View a summary of a project issues",
};
