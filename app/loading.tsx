import React from "react";
import { Skeleton } from "@/app/components";
import { Flex, Grid } from "@radix-ui/themes";

const DashboardSkeleton = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <Skeleton height="100px" />
        <Skeleton height="200px" />
      </Flex>
      <Skeleton height="400px" />
    </Grid>
  );
};

export default DashboardSkeleton;
