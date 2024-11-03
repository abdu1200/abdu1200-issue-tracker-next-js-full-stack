"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "open", value: "OPEN" },
    { label: "closed", value: "CLOSED" },
    { label: "in progress", value: "IN_PROGRESS" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams(); //acces current parameters

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(statusValue) => {
        const params = new URLSearchParams();
        if (statusValue !== "nothing") params.append("status", statusValue);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="select status to filter.."></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "nothing"}>
            {" "}
            {status.label}{" "}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ); //statusValue === 'nothing' ? '' : `?status=${statusValue}`
};

export default IssueStatusFilter;
