// import IssueStatusBadge from '@/app/components/IssueStatusBadge'      //refactoring
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./IssueDetails";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Description } from "@radix-ui/themes/src/components/alert-dialog.jsx";
import { cache } from "react";

interface Props {
  //this is a type what the component should take
  params: { id: string };
}

const fetchUser = cache((issueId: number) => {
  //call back func is passed to the cache
  return prisma.issue.findUnique({ where: { id: issueId } });
});

const IssueDetailPage = async ({ params }: Props) => {
  //this comp takes id parameter(params) from the route

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  await delay(2000);

  const session = await getServerSession(authOptions); //getServerSession is a function for accessing a user session and it takes an obj(aka authOptions) w/h is used for initializing nextauth

  return (
    <Grid columns={{ initial: "1", md: "5", sm: "5" }}>
      <Box className="lg:col-span-4  md:col-span-4">
        {" "}
        {/*lg in tailwind represents laptop but md in radix represents laptop and it goes on like that*/}
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          {" "}
          {/*this is for anonymous users to not see the edit and delete btn */}
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueBtn issueId={issue.id} />
            <DeleteIssueBtn issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

//when using tailwind, by default, heading and lists are not styled and we use typography plugin to style them

//The ReactMarkdown component expects its children prop to be a single string containing the Markdown content to render. However, if your issue?.description is stored as an array of strings, you need to convert it into a single string before passing it to ReactMarkdown.

//SRP is about software entities(like page, class, function, comp, hooks) have a single responsibility w/h is laying out components like(Gird comp with its boxs in our eg)

export async function generateMetadata({ params }: Props) {
  //to dynamically generate metadata from the issue title
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    Description: "detail of issue" + issue?.description,
  };
}
