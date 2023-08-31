import { getProblems } from "@/library/api/problems";
import ProblemsPage from "./components/ProblemsPage";

export default async function AdminProblems() {
  const problems = await getProblems();

  return <ProblemsPage problems={problems} />;
}
