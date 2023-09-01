import { maxLength, number, object, string } from "valibot";

export const NewAscentSchema = object({
  comment: string([
    maxLength(1000, "Comment must be less than 1000 characters"),
  ]),
  givenRating: number(),
});
