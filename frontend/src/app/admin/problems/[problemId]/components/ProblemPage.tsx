import { getTags } from "@/library/api/tags";
import EditProblemForm from "./EditProblemForm";
import Link from "next/link";

type ProblemPageProps = {
  problem: WithId<Problem>;
};

const ProblemPage = async ({ problem }: ProblemPageProps) => {
  const tags = await getTags();
  return (
    <article>
      <Link href={`/problems/${problem.id}`} className="hover:text-teal-500">
        <h1 className="text-2xl">{problem.name}</h1>
      </Link>
      <EditProblemForm tags={tags} problem={problem} />
    </article>
  );
};

export default ProblemPage;
