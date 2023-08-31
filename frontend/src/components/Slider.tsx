import { ComponentPropsWithoutRef, forwardRef } from "react";

type SliderProps = ComponentPropsWithoutRef<"input"> & {
  maxValue: number;
  minValue: number;
  label: string;
  watchValue: number;
  outputTransform?: (value: number) => string;
  className?: React.ComponentProps<"input">["className"];
};

const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    maxValue,
    minValue,
    label,
    watchValue,
    outputTransform = (value) => value.toString(),
    className,
    ...props
  }: SliderProps,
  ref,
) {
  const textOffset = ((watchValue / maxValue) * 100).toFixed(0).toString();

  return (
    <>
      <div className="flex w-full flex-col">
        <label htmlFor={props.name}>{label}</label>
        <input
          ref={ref}
          type="range"
          min={minValue}
          max={maxValue}
          className="accent-teal-500"
          {...props}
        />
        <div
          style={{
            marginLeft: `calc(${textOffset}% - (${textOffset} / 100) * 16px`,
          }}
          className="w-4 text-center"
        >
          {outputTransform(watchValue)}
        </div>
      </div>
    </>
  );
});

export default Slider;
