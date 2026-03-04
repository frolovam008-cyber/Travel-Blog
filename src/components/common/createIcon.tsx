import React from "react";

export type IconProps = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

type CreateIconArgs = {
  content: React.ReactNode;
  viewBox: string;
  defaultSize?: number;
  defaultWidth?: number;
  defaultHeight?: number;
};

export const createIcon = ({
  content,
  viewBox,
  defaultSize = 24,
  defaultWidth,
  defaultHeight,
}: CreateIconArgs) => {
  // вытаскиваем width / height из viewBox
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  const ratio = vbWidth / vbHeight;

  const Icon: React.FC<IconProps> = ({ size, width, height, className }) => {
    let finalWidth: number;
    let finalHeight: number;

    if (width && height) {
      finalWidth = width;
      finalHeight = height;
    } else if (width) {
      finalWidth = width;
      finalHeight = defaultHeight ?? width / ratio;
    } else if (height) {
      finalHeight = height;
      finalWidth = defaultWidth ?? height * ratio;
    } else {
      finalWidth = defaultWidth ?? size ?? defaultSize;
      finalHeight = defaultHeight ?? size ?? defaultSize;
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
        {content}
      </svg>
    );
  };

  return Icon;
};
