import Rating from "@/app/problems/[problemId]/components/Rating";
import Link from "next/link";
import React from "react";

type LocationImageProblemsProps = {
  lines: LocationImageLine[];
  highlight?: number;
  setHighlight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function LocationImageProblems({
  lines,
  highlight = undefined,
  setHighlight = () => {},
}: LocationImageProblemsProps) {
  return (
    <ol className="flex list-inside list-decimal flex-col">
      {lines.map(({ problem }, index) => (
        <li
          key={problem.id}
          className={`${index === highlight ? "bg-slate-200" : ""}`}
          onMouseEnter={() => setHighlight(index)}
        >
          <div className="inline-flex flex-col">
            <Link
              href={`/problems/${problem.id}`}
              className="hover:text-teal-500"
            >
              <span className="font-bold">
                {problem.name} ({problem.grade})
              </span>
            </Link>
            {problem.rating !== null && <Rating rating={problem.rating} />}
            {problem.description && (
              <div className="text-sm">{problem.description}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
