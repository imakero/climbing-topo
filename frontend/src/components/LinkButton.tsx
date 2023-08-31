import Link from "next/link";
import { PropsWithChildren } from "react";

type LinkButtonProps = {
  href: string;
  className?: React.ComponentProps<"a">["className"];
};

const LinkButton = ({
  href,
  className,
  children,
  ...props
}: PropsWithChildren<LinkButtonProps>) => {
  return (
    <Link
      href={href}
      className={`rounded border border-teal-500 bg-transparent px-4 py-2 font-semibold text-teal-500 hover:border-transparent hover:bg-teal-500 hover:text-white disabled:opacity-50 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
