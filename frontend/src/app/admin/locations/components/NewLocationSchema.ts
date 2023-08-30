import {
  enumType,
  maxLength,
  maxValue,
  minValue,
  number,
  object,
  string,
} from "valibot";

export const NewLocationSchema = object({
  name: string([maxLength(100, "Name must be less than 100 characters")]),
  type: enumType(["BL", "WA"], 'Type must be either "Block" or "Wall"'),
  position: object({
    lat: number([
      minValue(-90, "Latitude must be between -90 and 90"),
      maxValue(90, "Latitude must be between -90 and 90"),
    ]),
    lon: number([
      minValue(-180, "Longitude must be between -180 and 180"),
      maxValue(180, "Longitude must be between -180 and 180"),
    ]),
  }),
});
