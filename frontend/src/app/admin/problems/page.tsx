import ProblemsPage from "./components/ProblemsPage";

async function getProblems() {
  const problems = await fetch(`http://localhost:8009/api/v1/problems/`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return problems;
}

export default async function AdminProblems() {
  const problems = await getProblems();

  return <ProblemsPage problems={problems} />;
}
