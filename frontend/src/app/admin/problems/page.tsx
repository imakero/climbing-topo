import { getProblems } from "@/library/api/problems";
import ProblemsPage from "./components/ProblemsPage";

export default async function AdminProblems({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let params: Record<string, string> = {};
  if (searchParams["page"]) {
    params["page"] = searchParams["page"] as string;
  }
  const { results, ...props } = await getProblems(params);

  return (
    <ProblemsPage
      problems={results}
      {...props}
      page={searchParams["page"] ?? undefined}
    />
  );
}
