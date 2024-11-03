import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const IssueEditFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton />
      <Skeleton height="10rem" />
    </Box>
  );
};

export default IssueEditFormSkeleton;
