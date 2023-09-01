"use client";

import { useEffect, useState } from "react";
import AscentList from "./AscentList";
import AscentLogger from "./AscentLogger";

type AscentsSectionProps = {
  ascents: WithId<Ascent>[];
  problem: WithId<Problem>;
};

const AscentsSection = ({
  ascents: ascentsProp,
  problem,
}: AscentsSectionProps) => {
  const [ascents, setAscents] = useState(ascentsProp);

  useEffect(() => {
    setAscents(ascentsProp);
  }, [ascentsProp]);

  return (
    <section className="flex max-w-sm flex-col space-y-4">
      <h2 className="text-xl">Logged ascents</h2>

      <AscentLogger
        problem={problem}
        ascents={ascents}
        setAscents={setAscents}
      />
      <AscentList ascents={ascents} />
    </section>
  );
};

export default AscentsSection;
