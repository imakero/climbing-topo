import { getProblems } from "@/library/api/problems";
import Problem from "./components/Problem";

export async function generateStaticParams() {
  const { results: problems } = await getProblems();

  return problems.map((problem: WithId<Problem>) => ({
    problemId: problem.id.toString(),
  }));
}

async function getProblem(problemId: string) {
  const problem = await fetch(
    `http://localhost:8009/api/v1/problems/${problemId}/`,
    { cache: "no-cache" },
  ).then((res) => res.json());

  return problem;
}

async function getAscents(problemId: string) {
  const ascents = await fetch(
    `http://localhost:8009/api/v1/activities/ascents/?problem=${problemId}`,
    { cache: "no-cache" },
  ).then((res) => res.json());

  return ascents;
}

const Page = async ({ params }: { params: { problemId: string } }) => {
  const problem = await getProblem(params.problemId);
  const ascents = await getAscents(params.problemId);

  return <Problem problem={problem} ascents={ascents} />;
};

export default Page;
