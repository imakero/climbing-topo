"use client";

import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import LocationImage from "@/components/LocationImage";
import LocationImageProblems from "@/components/LocationImageProblems";
import Link from "next/link";

type LocationPageProps = {
  location: WithId<TopoLocation>;
};

const LocationPage = ({ location }: LocationPageProps) => {
  const deleteProblem = async (problemId: number) => {
    await fetch(`http://localhost:8009/api/v1/problems/${problemId}/`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return (
    <article>
      <h1 className="text-2xl">{location.name}</h1>
      <p>Type: Block</p>
      <h2 className="mt-4 text-xl">Problems</h2>
      <ol>
        {location.problems.map((problem) => (
          <li key={problem.id}>
            <div className="flex flex-row justify-between">
              <Link href={`/admin/problems/${problem.id}`}>
                {problem.name} ({problem.grade})
              </Link>
              <div className="flex flex-row">
                <LinkButton href={`/admin/problems/${problem.id}`}>
                  Edit
                </LinkButton>
                <Button onClick={() => deleteProblem(problem.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <h2 className="mt-4 text-xl">Images</h2>
      <div>
        {location.images.map((locationImage) => (
          <div key={locationImage.id} className="mt-4 space-y-2">
            <LinkButton href={`/admin/location-images/${locationImage.id}`}>
              Edit
            </LinkButton>
            <LocationImage locationImage={locationImage} />
            <LocationImageProblems
              problems={locationImage.lines.map((line) => line.problem)}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default LocationPage;
