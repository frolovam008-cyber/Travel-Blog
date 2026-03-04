import React from "react";

export type IconBaseProps = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  viewBox?: string;
  children: React.ReactNode;
};

export const IconBase: React.FC<IconBaseProps> = ({
  size = 24,
  width,
  height,
  className,
  viewBox = "0 0 24 24",
  children,
}) => {
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  const ratio = vbWidth / vbHeight;

  let finalWidth: number;
  let finalHeight: number;

  if (width && height) {
    finalWidth = width;
    finalHeight = height;
  } else if (width) {
    finalWidth = width;
    finalHeight = width / ratio;
  } else if (height) {
    finalHeight = height;
    finalWidth = height * ratio;
  } else {
    finalWidth = size;
    finalHeight = size;
  }

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
};
