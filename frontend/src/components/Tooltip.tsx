import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TooltipProps = ComponentPropsWithoutRef<"div"> & {
  className?: React.ComponentProps<"div">["className"];
};

const Tooltip = ({
  className,
  children,
  ...props
}: PropsWithChildren<TooltipProps>) => {
  return (
    <div
      className={twMerge(
        "text-teal invisible absolute bottom-full left-1/2 -translate-x-1/2 rounded border border-teal-500 bg-white px-4 py-1 font-normal text-teal-500 group-hover:visible",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        className="absolute left-0 top-full h-2 w-full text-black"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
      >
        <polygon className="fill-teal-500" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  );
};

export default Tooltip;
