import { getAbsoluteCoordinates, getAbsolutePoints } from "@/library/splines";
import { useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Line from "./Line";

type SvgOverlayProps = {
  editing: boolean;
  relativePoints: Point[];
  setRelativePoints: React.Dispatch<React.SetStateAction<Point[]>>;
  lines: LocationImageLine[];
};

const SvgOverlay = ({
  editing,
  relativePoints,
  setRelativePoints,
  lines,
}: SvgOverlayProps) => {
  const overlayRef = useRef<SVGSVGElement>(null);
  const _ = useWindowSize();

  const overlayWidth = overlayRef.current?.width.baseVal.value || 1;
  const overlayHeight = overlayRef.current?.height.baseVal.value || 1;

  const points = getAbsolutePoints(relativePoints, overlayWidth, overlayHeight);

  return (
    <svg
      ref={overlayRef}
      version="1.1"
      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      onClick={(e) => {
        if (!editing) return;
        const rect = (e.target as HTMLImageElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setRelativePoints([...relativePoints, { x, y }]);
      }}
    >
      {editing && <Line points={points} editing={true} />}
      {lines.map((line) => (
        <Line
          key={line.id}
          points={getAbsoluteCoordinates(
            line.points,
            overlayWidth,
            overlayHeight,
          )}
          editing={false}
        />
      ))}
    </svg>
  );
};

export default SvgOverlay;
