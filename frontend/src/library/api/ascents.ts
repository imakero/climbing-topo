import { NewAscentData } from "@/app/problems/[problemId]/components/AscentForm";

type AscentPayload = NewAscentData & {
  problem: number;
};

export const addAscent = async (data: AscentPayload) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/ascents/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
