import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState } from "react";
import { removeLine } from "@/library/api/lines";

type LocationImageProblemsProps = {
  lines: LocationImageLine[];
  onDelete: (lineId: number) => void;
};

const LocationImageProblems = ({
  lines,
  onDelete,
}: LocationImageProblemsProps) => {
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

export default LocationImageProblems;
