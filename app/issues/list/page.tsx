import prisma from "@/prisma/client";
import delay from "delay";
import ActionBtn from "./actionBtn";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/pagination";
import IssueTable, { columnValues, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
// import Link from '@/app/components/Link'     //here is the nextlink and radix link debate

interface Props {
  // searchParams: { status: Status; orderBy: keyof Issue; page: string };
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1; //1 is to initialize the current page
  const pageSize = 10;

  const validStatuses = Object.values(Status);
  // console.log(validStatuses)
  const status1 = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; //undefined does no filtering but also no error

  const assign1 = columnValues.includes(searchParams.orderBy) //columnValues is exported from IssueTable
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status1, //filtering by status
    },
    orderBy: assign1,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status: status1,
    },
  });

  await delay(2000); //a slow server-

  return (
    <Flex direction="column" gap="3">
      <ActionBtn />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic"; //the dynamic option to render the page dynamically
// export const revalidate = 60;  //to revalidate or refetch the page every 60 second

export default IssuesPage;

//all the values in the route are string by default

//in next/Link, there is a client side navigation but in radix/Link comp, there is no client side navigation(page reload is there)

//we used 'list' folder to remove duplicate skeletons  b/c the child loadings are overriding and using their parent loading and then theirs last

//catch all segment([...nextauth]), it caches any parameter like signin, signout

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "List of Issues",
};
