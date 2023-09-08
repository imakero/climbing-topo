"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { EditProblemSchema } from "./EditProblemSchema";
import { Output } from "valibot";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { updateProblem } from "@/library/api/problems";
import { useState } from "react";
import MultiSelect from "@/components/MultiSelect";

export type EditProblemData = Output<typeof EditProblemSchema>;
type EditProblemFormProps = {
  problem: WithId<Problem>;
  tags: WithId<Tag>[];
};

const EditProblemForm = ({ problem, tags }: EditProblemFormProps) => {
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<EditProblemData>({
    resolver: valibotResolver(EditProblemSchema),
    defaultValues: {
      name: problem.name,
      grade: problem.grade,
      description: problem.description,
      tags: problem.tags,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: EditProblemData) => {
    const tagIds = data.tags
      .map((tagName) => tags.find((tag) => tag.name === tagName))
      .map((tag) => tag?.id.toString())
      .filter((tagId) => tagId !== undefined) as string[];

    try {
      const response = await updateProblem(problem.id, {
        ...data,
        tags: tagIds,
      });
      if (response.ok) {
        setMessage("Problem updated");
        router.refresh();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error("Problem could not be updated");
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "error",
        message: "Something went wrong. Problem could not be updated.",
      });
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
      <label htmlFor="tags">Filter results on tags:</label>
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <MultiSelect
            {...field}
            tags={tags}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              field.onChange(selectedOptions);
            }}
          />
        )}
      />
      {errors.tags && <p className="text-red-500">{errors.tags?.message}</p>}
      {message && (
        <p className="my-4 border border-green-500 px-4 py-2 text-green-500">
          {message}
        </p>
      )}
      {errors.root && <p className="text-red-500">{errors.root?.message}</p>}
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default EditProblemForm;
