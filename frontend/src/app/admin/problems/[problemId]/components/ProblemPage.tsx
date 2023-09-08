import { getTags } from "@/library/api/tags";
import EditProblemForm from "./EditProblemForm";

type ProblemPageProps = {
  problem: WithId<Problem>;
};

const ProblemPage = async ({ problem }: ProblemPageProps) => {
  const tags = await getTags();
  return (
    <article>
      <h1 className="text-2xl">{problem.name}</h1>
      <EditProblemForm tags={tags} problem={problem} />
    </article>
  );
};

export default ProblemPage;
