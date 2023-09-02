import Ascent from "./Ascent";

type AscentListProps = {
  ascents: WithId<Ascent>[];
};

const AscentList = ({ ascents }: AscentListProps) => {
  return ascents.map((ascent) => <Ascent key={ascent.id} ascent={ascent} />);
};

export default AscentList;
