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
  const [API_KEY] = useState("r2U9aDHwGb0G4iHt9vwt");

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([location.position.lon, location.position.lat])
      .addTo(map.current);
  }, [API_KEY, lng, lat, zoom, location.position.lat, location.position.lon]);

  return (
    <div className="map-wrap relative h-[300px] w-[400px]">
      <div ref={mapContainer} className="map absolute h-full w-full" />
    </div>
  );
};

export default ProblemMap;
