import React from "react";
import { Link } from "react-router-dom";
import type { IconProps } from "../createIcon";
import "./Logo.scss";

type LogoProps = {
  size?: number; // квадратная сторона
  width?: number; // произвольная ширина
  height?: number; // произвольная высота
  alt?: string; // alt текст
  src?: string; // путь к PNG/JPG
  SvgIcon?: React.FC<IconProps>; // SVG иконка
};

export const Logo: React.FC<LogoProps> = ({
  size = 120,
  width,
  height,
  alt = "Logo",
  src,
  SvgIcon,
}) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <Link to="/" className="header__logo-link">
      {SvgIcon ? (
        <SvgIcon width={finalWidth} height={finalHeight} />
      ) : src ? (
        <img src={src} alt={alt} width={finalWidth} height={finalHeight} />
      ) : (
        <span className="header__logo-placeholder">{alt}</span>
      )}
    </Link>
  );
};
