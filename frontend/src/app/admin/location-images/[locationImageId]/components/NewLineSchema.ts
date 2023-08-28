import { object, string, custom } from "valibot";

const stringIsNumber = (val: string) => {
  return /[0-9]+/.test(val);
};

export const NewLineSchema = object({
  problem: string([custom(stringIsNumber, "Problem must be an id")]),
});
