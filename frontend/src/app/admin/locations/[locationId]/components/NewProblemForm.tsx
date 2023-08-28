import { Output } from "valibot";
import { NewProblemSchema } from "./NewProblemSchema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Button from "@/components/Button";

export type NewProblemData = Output<typeof NewProblemSchema>;

type NewProblemFormProps = {
  onSubmit: (data: NewProblemData) => void;
};

const NewProblemForm = ({ onSubmit }: NewProblemFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProblemData>({
    resolver: valibotResolver(NewProblemSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input {...register("name")} />
      {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
      <label htmlFor="grade">Grade</label>
      <input {...register("grade")} />
      {errors.grade && <p className="text-red-500">{errors.grade?.message}</p>}
      <label htmlFor="description">Description</label>
      <textarea {...register("description")} />
      {errors.description && (
        <p className="text-red-500">{errors.description?.message}</p>
      )}
      <Button type="submit">Add new problem!</Button>
    </form>
  );
};

export default NewProblemForm;
