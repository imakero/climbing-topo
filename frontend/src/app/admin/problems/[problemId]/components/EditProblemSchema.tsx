import { object, string, maxLength } from "valibot";

export const EditProblemSchema = object({
  name: string([maxLength(100, "Name must be less than 100 characters")]),
  description: string([
    maxLength(1000, "Description must be less than 1000 characters"),
  ]),
  grade: string([maxLength(4, "Use a french grade with maximum 4 characters")]),
});
