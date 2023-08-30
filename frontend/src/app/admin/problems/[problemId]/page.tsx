import {
  getProblems,
  getProblem as apiGetProblem,
} from "@/library/api/problems";
import ProblemPage from "./components/ProblemPage";

export async function generateStaticParams() {
  const problems = await getProblems();

  return problems.map((problem: WithId<Problem>) => ({
    problemId: problem.id.toString(),
  }));
}

async function getProblem(problemId: string) {
  const problem = await apiGetProblem(parseInt(problemId));

  return problem;
}

export default async function AdminProblem({
  params,
}: {
  params: { problemId: string };
}) {
  const problem = await getProblem(params.problemId);

  return <ProblemPage problem={problem} />;
}
