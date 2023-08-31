"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NewLineForm, { NewLineData } from "./NewLineForm";
import Button from "@/components/Button";
import SvgOverlay from "@/components/SvgOverlay";
import SvgLine from "@/components/SvgLine";
import { getAbsoluteCoordinates, getAbsolutePoints } from "@/library/splines";
import useWindowSize from "../hooks/useWindowSize";
import LocationImageProblems from "@/components/LocationImageProblems";
import { addLine, removeLine } from "@/library/api/lines";
import { useRouter } from "next/navigation";

type EditorProps = {
  locationImage: WithId<LocationImage>;
};

const getProblemsNotDrawn = (locationImage: LocationImage) => {
  const lines = locationImage.lines;
  const problems = locationImage.location.problems;
  const problemsDrawnIds = lines.map((line) => line.problem.id);
  return problems.filter((problem) => !problemsDrawnIds.includes(problem.id));
};

const Editor = ({ locationImage: locationImageProp }: EditorProps) => {
  const router = useRouter();
  const [locationImage, setLocationImage] = useState(locationImageProp);
  const [relativePoints, setRelativePoints] = useState<Point[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const _ = useWindowSize();

  const overlayRef = useRef<SVGSVGElement>(null);

  const width = locationImage.imageWidth;
  const height = locationImage.imageHeight;
  const problemsNotDrawn = getProblemsNotDrawn(locationImage);

  const overlayWidth = overlayRef.current?.width.baseVal.value || 1;
  const overlayHeight = overlayRef.current?.height.baseVal.value || 1;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setLocationImage(locationImageProp);
  }, [locationImageProp]);

  const startEditing = () => {
    setEditing(true);
    setRelativePoints([]);
  };

  const saveLine = async (data: NewLineData) => {
    try {
      setLocationImage((locationImage) => ({
        ...locationImage,
        lines: [
          ...locationImage.lines,
          {
            id: -Math.random(),
            problem: locationImage.location.problems.find(
              (problem) => problem.id === parseInt(data.problem),
            ) as LocationImageProblem,
            points: {
              type: "LineString",
              coordinates: relativePoints.map((point) => [point.x, point.y]),
            },
          },
        ],
      }));
      const response = await addLine({
        locationImage: locationImage.id,
        points: {
          type: "LineString",
          coordinates: relativePoints.map((point) => [point.x, point.y]),
        },
        problem: parseInt(data.problem),
      });
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to add line");
      }
    } catch (error) {
      console.error(error);
      setLocationImage(locationImage);
    }

    setEditing(false);
  };

  const deleteLine = async (lineId: number) => {
    if (lineId < 0) {
      return;
    }
    try {
      setLocationImage((locationImage) => ({
        ...locationImage,
        lines: locationImage.lines.filter((line) => line.id !== lineId),
      }));
      const response = await removeLine(lineId);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete line");
      }
    } catch (error) {
      console.error(error);
      setLocationImage(locationImage);
    }
  };

  const stopEditing = () => {
    setEditing(false);
    setRelativePoints([]);
  };

  const undoPoint = () => {
    setRelativePoints((points) => points.slice(0, points.length - 1));
  };

  return (
    <div className="flex flex-col">
      <div>
        <div className="relative inline-block">
          <Image
            src={locationImage.image}
            alt={`Location Image for location ${locationImage.location.name}`}
            width={width}
            height={height}
          />
          <SvgOverlay
            ref={overlayRef}
            onClick={(e) => {
              if (!editing) return;
              const rect = (
                e.target as HTMLImageElement
              ).getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const y = (e.clientY - rect.top) / rect.height;
              setRelativePoints([...relativePoints, { x, y }]);
            }}
          >
            <g className={`${loading ? "hidden" : ""}`}>
              {editing && (
                <SvgLine
                  points={getAbsolutePoints(
                    relativePoints,
                    overlayWidth,
                    overlayHeight,
                  )}
                  editing={true}
                />
              )}
              {locationImage.lines.map((line, index) => (
                <SvgLine
                  key={line.id}
                  points={getAbsoluteCoordinates(
                    line.points,
                    overlayWidth,
                    overlayHeight,
                  )}
                  editing={false}
                  index={index + 1}
                />
              ))}
            </g>
          </SvgOverlay>
        </div>
      </div>
      <ul>
        <LocationImageProblems
          lines={locationImage.lines}
          onDelete={deleteLine}
        />
      </ul>
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
