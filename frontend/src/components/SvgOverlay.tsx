import { ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from "react";

type SvgOverlayProps = ComponentPropsWithoutRef<"svg">;

const SvgOverlay = forwardRef<
  SVGSVGElement,
  PropsWithChildren<SvgOverlayProps>
>(function SvgOverlay({ children, ...props }, ref) {
  return (
    <svg
      ref={ref}
      version="1.1"
      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
});

export default SvgOverlay;
