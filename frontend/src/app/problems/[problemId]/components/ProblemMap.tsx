"use client";

import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type ProblemMapProps = {
  location: WithId<TopoLocation>;
};

const ProblemMap = ({ location }: ProblemMapProps) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(location.position.lon);
  const [lat] = useState(location.position.lat);
  const [zoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([location.position.lon, location.position.lat])
      .addTo(map.current);
  }, [lng, lat, zoom, location.position.lat, location.position.lon]);

  return (
    <div className="map-wrap relative h-[300px] w-[400px]">
      <div ref={mapContainer} className="map absolute h-full w-full" />
    </div>
  );
};

export default ProblemMap;
