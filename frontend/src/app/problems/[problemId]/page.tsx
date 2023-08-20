import Problem from "./components/Problem";

export async function generateStaticParams() {
  const problems = await fetch("http://localhost:8009/api/v1/problems/").then(
    (res) => res.json(),
  );

  return problems.map((problem: WithId<Problem>) => ({
    problemId: problem.id.toString(),
  }));
}

async function getProblem(problemId: string) {
  const problem = await fetch(
    `http://localhost:8009/api/v1/problems/${problemId}/`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json());

  return problem;
}

const Page = async ({ params }: { params: { problemId: string } }) => {
  const problem = await getProblem(params.problemId);

  return <Problem problem={problem} />;
};

export default Page;
