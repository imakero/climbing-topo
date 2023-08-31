"use client";

import { grades, gradeToIndex } from "@/library/grades";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { Output } from "valibot";
import { SearchFormSchema } from "./SearchFormSchema";
import Button from "@/components/Button";
import Slider from "@/components/Slider";

type SearchPageProps = {};

export type SearchFormData = Output<typeof SearchFormSchema>;

const SearchPage = ({}: SearchPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchFormData>({
    resolver: valibotResolver(SearchFormSchema),
    defaultValues: {
      minGrade: 0,
      maxGrade: grades.length - 1,
      minAscents: 0,
      maxAscents: 1000,
      minRating: 0,
      maxRating: 5,
      distKm: 10,
      lat: 0,
      lon: 0,
      name: "",
      description: "",
    },
  });
  const maxGradeIndex = grades.length - 1;

  const onSubmit = async (data: SearchFormData) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
      <Slider
        label="Max Distance (km)"
        minValue={0}
        maxValue={500}
        watchValue={watch("distKm")}
        {...register("distKm", { valueAsNumber: true })}
      />

      <label htmlFor="lat">Latitude</label>
      <input {...register("lat", { valueAsNumber: true })} />
      <label htmlFor="lon">Longitude</label>
      <input {...register("lon", { valueAsNumber: true })} />

      <label htmlFor="name">Name should contain:</label>
      <input {...register("name")} />
      <label htmlFor="description">Description should contain:</label>
      <input {...register("description")} />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchPage;
