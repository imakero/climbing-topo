"use client";

import Button from "./Button";

type AdminLocationImageProblemsProps = {
  lines: LocationImageLine[];
  onDelete?: (lineId: number) => void;
};

const AdminLocationImageProblems = ({
  lines,
  onDelete = () => {},
}: AdminLocationImageProblemsProps) => {
  return (
    <ol className="list-inside list-decimal">
      {lines.map((line) => (
        <li key={line.id}>
          <div className="flex flex-row items-center justify-between">
            <span>
              {line.problem.name} ({line.problem.grade})
            </span>
            <div>
              <Button onClick={(e) => onDelete(line.id)}>Delete</Button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default AdminLocationImageProblems;
