import Rating from "./Rating";
import User from "./User";

type AscentProps = {
  ascent: WithId<Ascent>;
};

const Ascent = ({ ascent }: AscentProps) => {
  return (
    <div className="flex max-w-sm flex-col ">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-bold">
          <User user={ascent.user} />
        </h3>
        <span className="text-sm">{ascent.createdAt.slice(0, 10)}</span>
      </div>
      <Rating rating={ascent.givenRating} />
      <p>{ascent.comment}</p>
    </div>
  );
};

export default Ascent;
