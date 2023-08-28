"use client";

import Image from "next/image";
import { useState } from "react";
import NewLineForm, { NewLineData } from "./NewLineForm";
import Button from "@/components/Button";
import SvgOverlay from "./Overlay";

type EditorProps = {
  locationImage: WithId<LocationImage>;
};

const getProblemsNotDrawn = (locationImage: LocationImage) => {
  const lines = locationImage.lines;
  const problems = locationImage.location.problems;
  const problemsDrawn = lines.map((line) => line.problem.id);
  return problems.filter((problem) => !problemsDrawn.includes(problem.id));
};

const Editor = ({ locationImage }: EditorProps) => {
  const [relativePoints, setRelativePoints] = useState<Point[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const width = locationImage.imageWidth;
  const height = locationImage.imageHeight;
  const problemsNotDrawn = getProblemsNotDrawn(locationImage);

  const startEditing = () => {
    setEditing(true);
    setRelativePoints([]);
  };

  const saveLine = async (data: NewLineData) => {
    const response = await fetch(`http://localhost:8009/api/v1/lines/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        locationImage: locationImage.id,
        points: {
          type: "LineString",
          coordinates: relativePoints.map((point) => [point.x, point.y]),
        },
        problem: data.problem,
      }),
    });

    setEditing(false);
  };

  const stopEditing = () => {
    setEditing(false);
    setRelativePoints([]);
  };

  const undoPoint = () => {
    setRelativePoints((points) => points.slice(0, points.length - 1));
  };

  return (
    <div className="block">
      <div>
        <div className="relative inline-block">
          <Image
            src={locationImage.image}
            alt={`Location Image for location ${locationImage.location.name}`}
            width={width}
            height={height}
          />
          <SvgOverlay
            editing={editing}
            relativePoints={relativePoints}
            setRelativePoints={setRelativePoints}
            lines={locationImage.lines}
          />
        </div>
      </div>
      {editing ? (
        <NewLineForm
          onSubmit={saveLine}
          problems={problemsNotDrawn}
          onUndo={undoPoint}
          canUndo={relativePoints.length > 0}
          onCancel={stopEditing}
        />
      ) : (
        <>
          {problemsNotDrawn.length === 0 && (
            <p>
              There are no problems in this location that have not already been
              drawn in this image. To add another problem to this location, go
              to the location page.
            </p>
          )}
          <Button
            onClick={startEditing}
            disabled={problemsNotDrawn.length === 0}
          >
            Add Line
          </Button>
        </>
      )}
    </div>
  );
};

export default Editor;
