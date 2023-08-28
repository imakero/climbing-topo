import Link from "next/link";

type LocationProps = {
  location: WithId<TopoLocation>;
};

const Location = ({ location }: LocationProps) => {
  return (
    <article>
      <h1 className="text-2xl">{location.name}</h1>
      <p>Type: Block</p>
      <h2 className="mt-4 text-xl">Problems</h2>
      <ol>
        {location.problems.map((problem) => (
          <li key={problem.id}>
            <Link href={`/admin/problems/${problem.id}`}>
              {problem.name} ({problem.grade})
            </Link>
          </li>
        ))}
      </ol>
      <h2 className="mt-4 text-xl">Images</h2>
      <ul>Image list</ul>
    </article>
  );
};

export default Location;
