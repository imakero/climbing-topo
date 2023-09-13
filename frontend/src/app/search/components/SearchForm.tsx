"use client";

import { grades } from "@/library/grades";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import { Output } from "valibot";
import { SearchFormSchema } from "./SearchFormSchema";
import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { getProblems } from "@/library/api/problems";
import { useState } from "react";
import SearchResults from "./SearchResults";
import MultiSelect from "@/components/MultiSelect";
import PositionSelector from "@/components/PositionSelector";

type SearchFormProps = {
  tags: WithId<Tag>[];
};

export type SearchFormData = Output<typeof SearchFormSchema>;

export default function SearchForm({ tags }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<SearchFormData>({
    resolver: valibotResolver(SearchFormSchema),
    defaultValues: {
      minGrade: 0,
      maxGrade: grades.length - 1,
      minAscents: 0,
      maxAscents: 1000,
      minRating: 0,
      maxRating: 5,
      position: { latitude: 59.775955, longitude: 17.372902, distKm: 10 },
      name: "",
      description: "",
      location: "",
      tags: [],
    },
  });
  const [problems, setProblems] = useState<WithId<Problem>[]>([]);
  const [geoFilter, setGeoFilter] = useState(false);
  const maxGradeIndex = grades.length - 1;

  const onSubmit = async (data: SearchFormData) => {
    const params: Record<string, string> = {};
    const grade = grades.slice(data.minGrade, data.maxGrade + 1).join(",");
    params["grade"] = grade;
    params["minAscents"] = data.minAscents.toString();
    params["maxAscents"] = data.maxAscents.toString();
    params["minRating"] = data.minRating.toString();
    params["maxRating"] = data.maxRating.toString();

    if (geoFilter) {
      params["distKm"] = data.position.distKm.toString();
      params["lat"] = data.position.latitude.toString();
      params["lon"] = data.position.longitude.toString();
    }

    if (data.name) params["name"] = data.name;
    if (data.description) params["description"] = data.description;
    if (data.location) params["location"] = data.location;
    if (data.tags.length > 0) params["tags"] = data.tags.join(",");

    const results = await getProblems(params);
    setProblems(results);
  };

  return (
    <>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl">Search for problems</h1>
        <Slider
          label="Min Grade"
          minValue={0}
          maxValue={maxGradeIndex}
          watchValue={watch("minGrade")}
          outputTransform={(value) => grades[value]}
          {...register("minGrade", { valueAsNumber: true })}
        />
        <Slider
          label="Max Grade"
          minValue={0}
          maxValue={maxGradeIndex}
          watchValue={watch("maxGrade")}
          outputTransform={(value) => grades[value]}
          {...register("maxGrade", { valueAsNumber: true })}
        />
        <Slider
          label="Min Ascents"
          minValue={0}
          maxValue={1000}
          watchValue={watch("minAscents")}
          {...register("minAscents", { valueAsNumber: true })}
        />
        <Slider
          label="Max Ascents"
          minValue={0}
          maxValue={1000}
          watchValue={watch("maxAscents")}
          {...register("maxAscents", { valueAsNumber: true })}
        />
        <Slider
          label="Min Rating"
          minValue={0}
          maxValue={5}
          watchValue={watch("minRating")}
          {...register("minRating", { valueAsNumber: true })}
        />
        <Slider
          label="Max Rating"
          minValue={0}
          maxValue={5}
          watchValue={watch("maxRating")}
          {...register("maxRating", { valueAsNumber: true })}
        />

        <hr />
        <label htmlFor="geoFilter">
          Enable geographic filtering
          <input
            type="checkbox"
            id="geoFilter"
            className="ml-2"
            checked={geoFilter}
            onChange={() => setGeoFilter(!geoFilter)}
          />
        </label>
        {geoFilter && (
          <>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <>
                  <Slider
                    label="Max Distance (km)"
                    minValue={0}
                    maxValue={500}
                    watchValue={watch("position").distKm}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        distKm: parseFloat(e.target.value),
                      })
                    }
                    value={watch("position").distKm}
                  />
                  <PositionSelector
                    position={watch("position")}
                    setPosition={field.onChange}
                  />
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    id="latitude"
                    name="latitude"
                    value={field.value.latitude}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        latitude: parseFloat(e.target.value),
                      })
                    }
                  />
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    id="longitude"
                    name="longitude"
                    value={field.value.longitude}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        longitude: parseFloat(e.target.value),
                      })
                    }
                  />
                </>
              )}
            />
          </>
        )}
        <hr />

        <label htmlFor="name">Name should contain:</label>
        <input id="name" {...register("name")} />
        <label htmlFor="description">Description should contain:</label>
        <input id="description" {...register("description")} />
        <label htmlFor="location">Location should contain:</label>
        <input id="location" {...register("location")} />
        <label htmlFor="tags">Filter results on tags:</label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                field.onChange(selectedOptions);
              }}
              tags={tags}
            />
          )}
        />
        <Button type="submit">Search</Button>
      </form>
      <SearchResults problems={problems} />
    </>
  );
}
