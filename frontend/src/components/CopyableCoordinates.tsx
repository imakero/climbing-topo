"use client";

import { PropsWithChildren, useState } from "react";
import Button from "./Button";
import Tooltip from "./Tooltip";

type CopyableCoordinatesProps = {};

const CopyableCoordinates = ({
  children,
}: PropsWithChildren<CopyableCoordinatesProps>) => {
  const [tooltipText, setTooltipText] = useState("Click to copy to clipboard");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTooltipText("Copied!");
    navigator.clipboard.writeText("Copied!");
    setTimeout(() => {
      setTooltipText("Click to copy to clipboard");
    }, 2500);
  };

  return (
    <Button
      onClick={handleClick}
      className="group relative border-none bg-transparent enabled:hover:bg-gray-100 enabled:hover:text-teal-500"
    >
      {children}
      <Tooltip>{tooltipText}</Tooltip>
    </Button>
  );
};

export default CopyableCoordinates;
