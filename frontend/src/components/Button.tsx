import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  className?: React.ComponentProps<"button">["className"];
};

const Button = ({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={twMerge(
        "rounded border border-teal-500 bg-transparent px-4 py-2 font-semibold text-teal-500 enabled:hover:border-transparent enabled:hover:bg-teal-500 enabled:hover:text-white disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
