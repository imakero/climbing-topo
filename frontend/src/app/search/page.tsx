import { getTags } from "@/library/api/tags";
import SearchForm from "./components/SearchForm";

type SearchPageProps = {};

const SearchPage = async ({}: SearchPageProps) => {
  const tags = await getTags();

  return (
    <div className="flex flex-col">
      <SearchForm tags={tags} />
    </div>
  );
};

export default SearchPage;
