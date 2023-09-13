"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import maplibregl, {
  GeoJSONSource,
  Map,
  MapMouseEvent,
  Marker,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { generateCircularPolygon } from "@/library/circlePolygon";

type PositionSelectorProps = {
  position: { longitude: number; latitude: number; distKm: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      distKm: number;
    }>
  >;
};

export default function PositionSelector({
  position,
  setPosition,
}: PositionSelectorProps) {
  const mapContainer = useRef<any>(null);
  const map = useRef<Map | null>(null);
  const marker = useRef<Marker | null>(null);
  const [zoom] = useState(5);

  const updateMapPosition = useCallback(() => {
    if (map.current && marker.current) {
      map.current.panTo([position.longitude, position.latitude], {
        duration: 1000,
      });
      marker.current.setLngLat([position.longitude, position.latitude]);
      const source = map.current.getSource("radius") as GeoJSONSource;
      if (!source) return;

      const coords = generateCircularPolygon(
        position.latitude,
        position.longitude,
        position.distKm,
        360,
      );
      source.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: coords,
        },
      });
      const minLat = Math.min(...coords[0].map((coord) => coord[0]));
      const maxLat = Math.max(...coords[0].map((coord) => coord[0]));
      const minLng = Math.min(...coords[0].map((coord) => coord[1]));
      const maxLng = Math.max(...coords[0].map((coord) => coord[1]));

      map.current.fitBounds(
        [
          [minLat, minLng],
          [maxLat, maxLng],
        ],
        {
          padding: 20,
        },
      );
    }
  }, [position]);

  const onDragEnd = useCallback(() => {
    const { lat, lng } = (marker.current as Marker).getLngLat();
    setPosition({ latitude: lat, longitude: lng, distKm: position.distKm });
  }, [position, setPosition]);

  const onClick = useCallback(
    (event: MapMouseEvent & Object) => {
      const { lng, lat } = event.lngLat;
      setPosition({ latitude: lat, longitude: lng, distKm: position.distKm });
    },
    [position, setPosition],
  );

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
        center: [position.longitude, position.latitude],
        zoom: zoom,
      });
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
      map.current.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );
      marker.current = new maplibregl.Marker({
        color: "#FF0000",
        draggable: true,
      })
        .setLngLat([position.longitude, position.latitude])
        .addTo(map.current);

      map.current.on("click", onClick);

      map.current.on("load", () => {
        if (!map.current) return;

        map.current.addSource("radius", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: generateCircularPolygon(
                position.latitude,
                position.longitude,
                position.distKm,
                360,
              ),
            },
          },
        });
        map.current.addLayer({
          id: "radius",
          type: "fill",
          source: "radius",
          layout: {},
          paint: {
            "fill-color": "#800",
            "fill-opacity": 0.25,
          },
        });
      });
    } else {
      if (marker.current) {
        marker.current.on("dragend", onDragEnd);
        map.current.on("click", onClick);
      }
    }
  }, [position, setPosition, zoom, onDragEnd, onClick]);

  useEffect(() => {
    updateMapPosition();
  }, [updateMapPosition]);

  return (
    <div className="map-wrap relative h-[300px] w-[400px]">
      <div ref={mapContainer} className="map absolute h-full w-full" />
    </div>
  );
}
