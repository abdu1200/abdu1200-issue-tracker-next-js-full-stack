import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "Closed", value: closed, status: "CLOSED" },
    { label: "InProgress", value: inProgress, status: "IN_PROGRESS" },
  ];

  return (
    <Flex gap="5">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column">
            <NextLink
              href={`/issues/list?status=${container.status}`}
              className="font-medium text-sm"
            >
              {container.label}
            </NextLink>
            <Text size="4" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
