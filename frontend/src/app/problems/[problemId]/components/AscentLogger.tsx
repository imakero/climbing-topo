"use client";

import Button from "@/components/Button";
import { useContext, useState } from "react";
import AscentForm from "./AscentForm";
import { UserContext } from "@/app/context/UserProvider";

type AscentLoggerProps = {
  problem: WithId<Problem>;
  ascents: WithId<Ascent>[];
  setAscents: React.Dispatch<React.SetStateAction<WithId<Ascent>[]>>;
};

const AscentLogger = ({ problem, ascents, setAscents }: AscentLoggerProps) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const userAscent = ascents.find((ascent) => ascent.user.id === user.id);
  if (userAscent) {
    return (
      <p>You climbed this problem on {userAscent.createdAt.slice(0, 10)}.</p>
    );
  }

  return (
    <div>
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>Log Ascent</Button>
      )}
      {showForm && (
        <div className="flex flex-col">
          <AscentForm
            problem={problem}
            ascents={ascents}
            setAscents={setAscents}
            setShowForm={setShowForm}
          />
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default AscentLogger;
