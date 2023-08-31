"use client";

import Image from "next/image";
import SvgOverlay from "./SvgOverlay";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import SvgLine from "./SvgLine";
import { getAbsoluteCoordinates } from "@/library/splines";
import useWindowSize from "@/app/admin/location-images/[locationImageId]/hooks/useWindowSize";

type LocationImageProps = ComponentPropsWithoutRef<"div"> & {
  locationImage: WithId<LocationImage>;
};

const LocationImage = ({ locationImage, ...props }: LocationImageProps) => {
  const overlayRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useWindowSize();

  const overlayWidth = overlayRef.current?.width.baseVal.value || 1;
  const overlayHeight = overlayRef.current?.height.baseVal.value || 1;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div {...props}>
      <div className="relative inline-block">
        <Image
          src={locationImage.image}
          alt={`Location Image for location ${locationImage.location.name}`}
          width={locationImage.imageWidth}
          height={locationImage.imageHeight}
        />
        <SvgOverlay ref={overlayRef}>
          <g className={`${loading ? "hidden" : ""}`}>
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
  );
};

export default LocationImage;
