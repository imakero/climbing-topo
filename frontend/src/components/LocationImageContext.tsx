"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type LocationImageContext = {
  overlayWidth: number;
  overlayHeight: number;
  overlayRef: React.RefObject<SVGSVGElement> | null;
};

export const LocationImageContext = createContext<LocationImageContext>({
  overlayWidth: 1,
  overlayHeight: 1,
  overlayRef: null,
});

export default function LocationImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [_, setLoading] = useState<boolean>(true);
  const overlayRef = useRef<SVGSVGElement>(null);
  const overlayWidth = overlayRef.current?.width.baseVal.value || 1;
  const overlayHeight = overlayRef.current?.height.baseVal.value || 1;

  useEffect(() => {
    setLoading(false);
  }, [overlayRef]);

  return (
    <LocationImageContext.Provider
      value={{ overlayWidth, overlayHeight, overlayRef }}
    >
      {children}
    </LocationImageContext.Provider>
  );
}

export function useLocationImage() {
  return useContext(LocationImageContext);
}
