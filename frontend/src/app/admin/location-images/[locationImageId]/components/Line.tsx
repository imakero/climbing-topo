import { calculateLinePath } from "@/library/splines";
import { Fragment } from "react";

type LineProps = {
  points: Point[];
  editing?: boolean;
};

const Line = ({ points, editing = false }: LineProps) => {
  return (
    <g>
      <path
        className="stroke-teal-200"
        d={calculateLinePath(points)}
        strokeWidth="3px"
        fill="none"
      />
      {editing
        ? points.map((point, index) => (
            <Fragment key={`number-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="7"
                className="fill-teal-200"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                className="fill-yellow-500"
              />
              <rect
                x={point.x + 5}
                y={point.y - 25}
                width="20"
                height="20"
                className="fill-teal-200"
              />
              <rect
                x={point.x + 7}
                y={point.y - 23}
                width="16"
                height="16"
                className="fill-yellow-500"
              />
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

export default Line;
