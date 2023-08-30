import { NewProblemData } from "@/app/admin/locations/[locationId]/components/NewProblemForm";
import { EditProblemData } from "@/app/admin/problems/[problemId]/components/EditProblemForm";

type ProblemPayload = NewProblemData & {
  location: number;
  tags: number[];
};

export const addProblem = async (data: ProblemPayload) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/`, {
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
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/`, {
    method: "DELETE",
    credentials: "include",
  });

export const getProblems = async (): Promise<WithId<Problem>[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const getProblem = async (problemId: number): Promise<WithId<Problem>> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const updateProblem = async (
  problemId: number,
  data: Partial<EditProblemData>,
) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problemId}/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
