"use client";

import { type Output } from "valibot";
import { NewLineSchema } from "./NewLineSchema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Button from "@/components/Button";

export type NewLineData = Output<typeof NewLineSchema>;

type NewLineFormProps = {
  onSubmit: (data: NewLineData) => void;
  problems: LocationImageProblem[];
  onUndo: () => void;
  canUndo: boolean;
  onCancel: () => void;
};

const NewLineForm = ({
  onSubmit,
  problems,
  onUndo,
  canUndo,
  onCancel,
}: NewLineFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NewLineData>({
    resolver: valibotResolver(NewLineSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Button type="button" onClick={onUndo} disabled={!canUndo}>
        Undo point
      </Button>
      <label htmlFor="problem">
        Draw a line by clicking along its path in the image and select a problem
        from the dropdown below:
      </label>
      <select {...register("problem")}>
        {problems.map((problem) => (
          <option key={problem.id} value={problem.id}>
            {problem.name} ({problem.grade})
          </option>
        ))}
      </select>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default NewLineForm;
