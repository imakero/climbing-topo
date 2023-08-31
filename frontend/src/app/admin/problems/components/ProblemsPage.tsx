"use client";

import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { removeProblem } from "@/library/api/problems";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProblemsPageProps = {
  problems: WithId<Problem>[];
};

const ProblemsPage = ({ problems: problemsProp }: ProblemsPageProps) => {
  const [problems, setProblems] = useState(problemsProp);
  const router = useRouter();

  useEffect(() => {
    setProblems(problemsProp);
  }, [problemsProp]);

  const deleteProblem = async (problemId: number) => {
    try {
      setProblems((problems) => problems.filter((p) => p.id !== problemId));
      const response = await removeProblem(problemId);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete problem");
      }
    } catch (e) {
      console.error(e);
      setProblems(problems);
    }
  };

  return (
    <div>
      <h1 className="text-2x">Problems Admin</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <div className="flex flex-row justify-between">
              <Link href={`/admin/problems/${problem.id}`}>
                {problem.name} {problem.grade}
              </Link>
              <div>
                <LinkButton
                  href={`/admin/problems/${problem.id}`}
                  className="ml-4"
                >
                  Edit
                </LinkButton>
                <Button
                  onClick={() => deleteProblem(problem.id)}
                  className="ml-4"
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemsPage;
