import AscentList from "./AscentList";
import ProblemMap from "./ProblemMap";
import Rating from "./Rating";

type ProblemProps = {
  problem: Problem;
  ascents: WithId<Ascent>[];
};

const Problem = ({ problem, ascents }: ProblemProps) => {
  return (
    <div className="container mx-auto flex flex-col space-y-4">
      <h1 className="text-2xl">
        {problem.name} ({problem.grade})
      </h1>
      <section>
        {problem.tags.map((tag: string, index) => (
          <span
            key={index}
            className="mr-2 rounded-full bg-teal-500 px-3 py-1 text-teal-200"
          >
            {tag}
          </span>
        ))}
      </section>
      <section>
        <h2 className="text-xl">About</h2>
        <p>{problem.description}</p>
      </section>
      <section>
        <h2 className="text-xl">Statistics</h2>
        <p>Ascents: {problem.ascents}</p>
        {problem.rating ? (
          <p>
            Average rating: <Rating rating={Math.round(problem.rating)} />(
            {problem.rating.toFixed(1)})
          </p>
        ) : (
          <p>This problem has not been rated by anyone.</p>
        )}
      </section>
      <AscentList ascents={ascents} />
      <section>
        <h2 className="text-xl">Location</h2>
        <ProblemMap location={problem.location} />
      </section>
    </div>
  );
};

export default Problem;
