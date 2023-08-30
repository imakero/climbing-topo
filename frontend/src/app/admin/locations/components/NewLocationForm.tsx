"use client";

import { Output } from "valibot";
import { NewLocationSchema } from "./NewLocationSchema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { addLocation } from "@/library/api/locations";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

type NewLocationFormProps = {
  locations: WithId<TopoLocation>[];
  setLocations: React.Dispatch<React.SetStateAction<WithId<TopoLocation>[]>>;
};

export type NewLocationData = Output<typeof NewLocationSchema>;

const NewLocationForm = ({ locations, setLocations }: NewLocationFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<NewLocationData>({
    resolver: valibotResolver(NewLocationSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: NewLocationData) => {
    setLocations((locations) => [
      ...locations,
      {
        id: -Math.random(),
        name: data.name,
        type: data.type,
        position: {
          lon: data.position.lon,
          lat: data.position.lat,
          googleMapsString: "",
        },
        problems: [],
        images: [],
      },
    ]);

    try {
      const response = await addLocation(data);
      if (response.ok) {
        reset();
        router.refresh();
      } else {
        throw new Error("Failed to add location");
      }
    } catch (error) {
      setError("root", {
        type: "error",
        message: "The location could not be created.",
      });
      console.error(error);
      setLocations(locations);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input {...register("name")} />
      {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
      <label htmlFor="type">Type</label>
      <select {...register("type")}>
        <option value="BL">Block</option>
        <option value="WA">Wall</option>
      </select>
      {errors.type && <p className="text-red-500">{errors.type?.message}</p>}
      <label htmlFor="position.lon">Longitude</label>
      <input {...register("position.lon", { valueAsNumber: true })} />
      {errors.position?.lon && (
        <p className="text-red-500">{errors.position?.lon?.message}</p>
      )}
      <label htmlFor="position.lat">Latitude</label>
      <input {...register("position.lat", { valueAsNumber: true })} />
      {errors.position?.lat && (
        <p className="text-red-500">{errors.position?.lat?.message}</p>
      )}
      {errors.root && <p className="text-red-500">{errors.root?.message}</p>}
      <Button type="submit">Add Location</Button>
    </form>
  );
};

export default NewLocationForm;
