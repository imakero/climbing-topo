import { Output } from "valibot";
import { NewProblemSchema } from "./NewProblemSchema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Button from "@/components/Button";
import { addProblem } from "@/library/api/problems";
import { useRouter } from "next/navigation";

export type NewProblemData = Output<typeof NewProblemSchema>;

type NewProblemFormProps = {
  location: WithId<TopoLocation>;
  setLocation: React.Dispatch<React.SetStateAction<WithId<TopoLocation>>>;
};

const NewProblemForm = ({ location, setLocation }: NewProblemFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProblemData>({
    resolver: valibotResolver(NewProblemSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: NewProblemData) => {
    setLocation((location) => {
      return {
        ...location,
        problems: [
          ...location.problems,
          { name: data.name, grade: data.grade, id: -Math.random() },
        ],
      };
    });

    try {
      const response = await addProblem({
        ...data,
        location: location.id,
        tags: [],
      });
      if (response.ok) {
        reset();
        router.refresh();
      } else {
        throw new Error("Failed to add problem");
      }
    } catch (error) {
      console.error(error);
      setLocation(location);
    }
  };

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
