"use client";

import EditProblemForm from "./EditProblemForm";

type ProblemPageProps = {
  problem: WithId<Problem>;
};

const ProblemPage = ({ problem }: ProblemPageProps) => {
  return (
    <article>
      <h1 className="text-2xl">{problem.name}</h1>
      <EditProblemForm problem={problem} />
    </article>
  );
};

export default ProblemPage;
