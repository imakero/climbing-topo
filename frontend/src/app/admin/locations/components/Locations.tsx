"use client";

import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { removeLocation } from "@/library/api/locations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewLocationForm from "./NewLocationForm";

type LocationsPageProps = {
  locations: WithId<TopoLocation>[];
};

const LocationsPage = ({ locations: locationsProp }: LocationsPageProps) => {
  const [locations, setLocations] = useState(locationsProp);
  const router = useRouter();

  useEffect(() => {
    setLocations(locationsProp);
  }, [locationsProp]);

  const deleteLocation = async (id: number) => {
    setLocations(locations.filter((location) => location.id !== id));
    try {
      const response = await removeLocation(id);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete location");
      }
    } catch (error) {
      console.error(error);
      setLocations(locations);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Locations Admin</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <div className="flex flex-row justify-between">
              <Link href={`/admin/locations/${location.id}`}>
                {location.name}
              </Link>
              <div>
                <LinkButton
                  href={`/admin/locations/${location.id}`}
                  className="ml-4"
                >
                  Edit
                </LinkButton>
                <Button
                  onClick={(e) => deleteLocation(location.id)}
                  className="ml-4"
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl">Add location</h2>
      <NewLocationForm locations={locations} setLocations={setLocations} />
    </div>
  );
};

export default LocationsPage;
