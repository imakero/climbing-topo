import Button from "@/components/Button";
import { addLocationImage } from "@/library/api/locationImages";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type NewImageData = {
  image: FileList;
};

type NewImageFormProps = {
  location: WithId<TopoLocation>;
};

const NewImageForm = ({ location }: NewImageFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<NewImageData>();
  const router = useRouter();

  const onSubmit = async (data: NewImageData) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.set("location", location.id.toString());

    const response = await addLocationImage(formData);

    if (response.ok) {
      router.refresh();
    } else {
      setError("image", {
        type: "error",
        message: "Something went wrong while uploading the image.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="image">Choose an image:</label>
      <input type="file" {...register("image")} />
      {errors.image && <p className="text-red-500">{errors.image?.message}</p>}
      <Button type="submit">Add image</Button>
    </form>
  );
};

export default NewImageForm;
