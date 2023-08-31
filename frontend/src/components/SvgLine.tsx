import { calculateLinePath } from "@/library/splines";
import { Fragment } from "react";

type LineProps = {
  points: Point[];
  editing?: boolean;
  index?: number;
};

const SvgLine = ({ points, editing = false, index = 0 }: LineProps) => {
  if (points.length === 0) return null;
  const { x: lineStartX, y: lineStartY } = points[0];

  return (
    <g className="fill-yellow-500 stroke-teal-200 stroke-2 hover:stroke-pink-500">
      <path d={calculateLinePath(points)} strokeWidth="3px" fill="none" />
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
