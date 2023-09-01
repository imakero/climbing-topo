import Link from "next/link";

type SearchResultsProps = {
  problems: WithId<Problem>[];
};

const SearchResults = ({ problems }: SearchResultsProps) => {
  if (problems.length === 0) return null;

  return (
    <section className="mt-8 flex flex-col space-y-2">
      <h2 className="text-2xl">Results</h2>
      <table>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>
                <Link
                  href={`/problems/${problem.id}`}
                  className="hover:text-teal-500"
                >
                  {problem.name} ({problem.grade})
                </Link>
              </td>
              <td>
                <Link
                  href={`/locations/${problem.location.id}`}
                  className="hover:text-teal-500"
                >
                  {problem.location.name}
                  {problem.distKm !== undefined
                    ? ` (${problem.distKm.toFixed(2)} km)`
                    : ""}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SearchResults;
