import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState } from "react";
import { removeLine } from "@/library/api/lines";
import LinkButton from "./LinkButton";

type LocationImageProblemsProps = {
  lines: LocationImageLine[];
};

const LocationImageProblems = ({
  lines: linesProp,
}: LocationImageProblemsProps) => {
  const router = useRouter();
  const [lines, setLines] = useState(linesProp);

  useEffect(() => {
    setLines(linesProp);
  }, [linesProp]);

  const deleteLine = async (lineId: number) => {
    try {
      setLines((lines) => lines.filter((line) => line.id !== lineId));

      const response = await removeLine(lineId);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete line");
      }
    } catch (e) {
      console.error(e);
      setLines(lines);
    }
  };

  return (
    <ol className="list-inside list-decimal">
      {lines.map((line) => (
        <li key={line.id}>
          <div className="flex flex-row items-center justify-between">
            <span>
              {line.problem.name} ({line.problem.grade})
            </span>
            <div>
              <Button onClick={(e) => deleteLine(line.id)}>Delete</Button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default LocationImageProblems;
