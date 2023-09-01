"use client";

import Image from "next/image";
import SvgOverlay from "./SvgOverlay";
import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import LocationImageProvider, {
  useLocationImage,
} from "./LocationImageContext";

type LocationImageProps = ComponentPropsWithoutRef<"div"> & {
  locationImage: WithId<LocationImage>;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

const LocationImage = ({
  locationImage,
  onClick,
  children,
  ...props
}: PropsWithChildren<LocationImageProps>) => {
  const { overlayRef } = useLocationImage();

  return (
    <div {...props}>
      <div className="relative inline-block">
        <Image
          src={locationImage.image}
          alt={`Location Image for location ${locationImage.location.name}`}
          width={locationImage.imageWidth}
          height={locationImage.imageHeight}
        />
        <SvgOverlay ref={overlayRef} onClick={onClick}>
          {overlayRef && <g>{children}</g>}
        </SvgOverlay>
      </div>
    </div>
  );
};

const LocationImageWrapper = ({
  children,
  ...props
}: PropsWithChildren<LocationImageProps>) => {
  return (
    <LocationImageProvider>
      <LocationImage {...props}>{children}</LocationImage>
    </LocationImageProvider>
  );
};

export default LocationImageWrapper;
