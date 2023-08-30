import { NewProblemData } from "@/app/admin/locations/[locationId]/components/NewProblemForm";

type ProblemPayload = NewProblemData & {
  location: number;
  tags: number[];
};

export const addProblem = async (data: ProblemPayload) =>
  fetch(`http://localhost:8009/api/v1/problems/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });

export const removeProblem = async (problemId: number) =>
  fetch(`http://localhost:8009/api/v1/problems/${problemId}/`, {
    method: "DELETE",
    credentials: "include",
  });
