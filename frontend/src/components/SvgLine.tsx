"use client";

import { calculateLinePath, getAbsoluteCoordinates } from "@/library/splines";
import { ComponentPropsWithoutRef, Fragment } from "react";
import { useLocationImage } from "./LocationImageContext";
import { twMerge } from "tailwind-merge";

type LineProps = ComponentPropsWithoutRef<"g"> & {
  linePoints: Line["points"];
  editing?: boolean;
  index?: number;
  className?: React.ComponentProps<"g">["className"];
};

const SvgLine = ({
  linePoints,
  editing = false,
  index = 0,
  className,
  ...props
}: LineProps) => {
  const { overlayWidth, overlayHeight } = useLocationImage();
  const points = getAbsoluteCoordinates(
    linePoints,
    overlayWidth,
    overlayHeight,
  );
  if (points.length === 0) return null;
  const { x: lineStartX, y: lineStartY } = points[0];

  return (
    <g
      className={twMerge(
        `cursor-pointer fill-yellow-500 stroke-teal-500 stroke-[3px] hover:stroke-teal-200`,
        className,
      )}
      {...props}
    >
      <path d={calculateLinePath(points)} fill="none" />
      {index !== 0 && (
        <>
          <circle cx={lineStartX} cy={lineStartY} r="12" />
          <text
            x={lineStartX}
            y={lineStartY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-teal-200 font-normal "
          >
            {index}
          </text>
        </>
      )}
      {editing
        ? points.map((point, index) => (
            <Fragment key={`number-${index}`}>
              <circle cx={point.x} cy={point.y} r="7" />
              <rect x={point.x + 5} y={point.y - 25} width="20" height="20" />
              <text
                x={point.x + 15}
                y={point.y - 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-teal-200"
              >
                {index + 1}
              </text>
            </Fragment>
          ))
        : null}
    </g>
  );
};

export default SvgLine;
