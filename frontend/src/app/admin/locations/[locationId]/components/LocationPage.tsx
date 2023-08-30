"use client";

import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import LocationImage from "@/components/LocationImage";
import LocationImageProblems from "@/components/LocationImageProblems";
import Link from "next/link";
import NewProblemForm, { NewProblemData } from "./NewProblemForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { removeProblem } from "@/library/api/problems";
import NewImageForm from "./NewImageForm";

type LocationPageProps = {
  location: WithId<TopoLocation>;
};

const LocationPage = ({ location: locationProp }: LocationPageProps) => {
  const [location, setLocation] = useState(locationProp);
  const router = useRouter();

  useEffect(() => {
    setLocation(locationProp);
  }, [locationProp]);

  const deleteProblem = async (problemId: number) => {
    if (problemId < 0) {
      return;
    }
    try {
      setLocation((location) => {
        return {
          ...location,
          problems: location.problems.filter((p) => p.id !== problemId),
        };
      });
      const response = await removeProblem(problemId);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete problem");
      }
    } catch (e) {
      console.error(e);
      setLocation(location);
    }
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
      <h2 className="mt-4 text-xl">Add new problem</h2>
      <NewProblemForm location={location} setLocation={setLocation} />
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
      <h2 className="mt-4 text-xl">Add image</h2>
      <NewImageForm location={location} />
    </article>
  );
};

export default LocationPage;
