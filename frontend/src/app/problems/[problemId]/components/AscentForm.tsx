import { Output } from "valibot";
import { NewAscentSchema } from "./NewAscentSchema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import { addAscent } from "@/library/api/ascents";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserProvider";

export type NewAscentData = Output<typeof NewAscentSchema>;

type AscentFormProps = {
  problem: WithId<Problem>;
  ascents: WithId<Ascent>[];
  setAscents: React.Dispatch<React.SetStateAction<WithId<Ascent>[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ratingTexts = ["Horrible", "Ok", "Good", "Great", "Amazing", "Perfect"];

const AscentForm = ({
  problem,
  ascents,
  setAscents,
  setShowForm,
}: AscentFormProps) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setError,
  } = useForm<NewAscentData>({
    resolver: valibotResolver(NewAscentSchema),
    defaultValues: {
      comment: "",
      givenRating: 0,
    },
  });

  const onSubmit = async (data: NewAscentData) => {
    try {
      if (!user) {
        throw new Error("You need to be logged in to log an ascent");
      }
      setAscents((ascents) => [
        ...ascents,
        {
          id: -Math.random(),
          ...data,
          problem: problem.id,
          user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      const response = await addAscent({
        ...data,
        problem: problem.id,
      });
      if (response.ok) {
        reset();
        setShowForm(false);
        router.refresh();
      } else {
        throw new Error("Failed to add ascent");
      }
    } catch (error) {
      console.error(error);
      setError("root", { type: "error", message: "Failed to add ascent" });
      setAscents(ascents);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Slider
        minValue={0}
        maxValue={5}
        label="How would you rate this problem?"
        watchValue={watch("givenRating")}
        {...register("givenRating", { valueAsNumber: true })}
        outputTransform={(value) => ratingTexts[value]}
      />
      <label htmlFor="comment">Comment</label>
      <textarea {...register("comment")} />

      <Button type="submit">Log ascent!</Button>
    </form>
  );
};

export default AscentForm;
