import { PAGE_SIZE } from "@/library/constants";
import LinkButton from "./LinkButton";
import Button from "./Button";

type PaginationControllerProps = {
  baseUrl: string;
  page?: string;
  count: string;
  next: string | null;
  previous: string | null;
};

export default function PaginationController({
  baseUrl,
  page = "1",
  count,
  next,
  previous,
}: PaginationControllerProps) {
  if (parseInt(count) <= PAGE_SIZE) return null;

  return (
    <div className="flex w-full flex-row justify-between py-4">
      {previous === null ? (
        <Button disabled>Previous</Button>
      ) : (
        <LinkButton href={`${baseUrl}?page=${previous}`}>Previous</LinkButton>
      )}
      <p>
        Page {page} of {Math.floor((parseInt(count) - 1) / PAGE_SIZE) + 1}
      </p>
      {next === null ? (
        <Button disabled>Next</Button>
      ) : (
        <LinkButton href={`${baseUrl}?page=${next}`}>Next</LinkButton>
      )}
    </div>
  );
}
