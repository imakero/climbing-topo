import Ascent from "./Ascent";

type AscentListProps = {
  ascents: WithId<Ascent>[];
};

const AscentList = ({ ascents }: AscentListProps) => {
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-xl">Logged ascents</h2>
      {ascents.map((ascent) => (
        <Ascent key={ascent.id} ascent={ascent} />
      ))}
    </section>
  );
};

export default AscentList;
