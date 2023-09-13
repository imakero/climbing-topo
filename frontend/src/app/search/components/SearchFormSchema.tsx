import { array, maxValue, minValue, number, object, string } from "valibot";

export const SearchFormSchema = object({
  minGrade: number(),
  maxGrade: number(),
  minAscents: number(),
  maxAscents: number(),
  minRating: number(),
  maxRating: number(),
  position: object({
    distKm: number(),
    latitude: number([
      minValue(-90, "Latitude must be between -90 and 90"),
      maxValue(90, "Latitude must be between -90 and 90"),
    ]),
    longitude: number([
      minValue(-180, "Longitude must be between -180 and 180"),
      maxValue(180, "Longitude must be between -180 and 180"),
    ]),
  }),
  name: string(),
  description: string(),
  location: string(),
  tags: array(string()),
});
