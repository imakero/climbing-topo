"use client";

import { useState } from "react";
import LocationImage from "./LocationImage";
import LocationImageProblems from "./LocationImageProblems";
import SvgLine from "./SvgLine";
import { useRouter } from "next/navigation";

type TopoProps = {
  locationImage: WithId<LocationImage>;
};

export default function Topo({ locationImage: image }: TopoProps) {
  const [highlight, setHighlight] = useState<number | undefined>(undefined);
  const router = useRouter();

  return (
    <div className="mb-4 max-w-lg">
      <LocationImage key={image.id} locationImage={image}>
        {image.lines.map((line, index) => (
          <SvgLine
            key={line.id}
            linePoints={line.points}
            index={index + 1}
            onMouseEnter={() => setHighlight(index)}
            onClick={() => router.push(`/problems/${line.problem.id}`)}
            className={highlight === index ? "stroke-teal-200" : ""}
          />
        ))}
      </LocationImage>
      <LocationImageProblems
        lines={image.lines}
        highlight={highlight}
        setHighlight={setHighlight}
      />
    </div>
  );
}
