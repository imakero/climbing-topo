type LocationImageProblemsProps = {
  problems: LocationImageProblem[];
};

const LocationImageProblems = ({ problems }: LocationImageProblemsProps) => {
  return (
    <ul>
      {problems.map((problem, index) => (
        <li key={problem.id}>
          {index + 1}. {problem.name} ({problem.grade})
        </li>
      ))}
    </ul>
  );
};

export default LocationImageProblems;
