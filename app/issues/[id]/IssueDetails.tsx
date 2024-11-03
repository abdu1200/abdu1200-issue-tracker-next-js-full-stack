import { IssueStatusBadge } from "@/app/components"; //refactored
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        {" "}
        <ReactMarkdown>
          {Array.isArray(issue?.description)
            ? issue?.description.join("\n")
            : issue?.description}
        </ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;

//prose limits 65 characters per line
//'md' in radix-ui is equivalent to 'lg' in tailwind w/h both means laptop
//prose by default gives a max width value
