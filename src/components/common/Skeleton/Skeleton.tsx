import clsx from "clsx";
import "@/components/common/Skeleton/Skeleton.scss";

interface SkeletonProps {
  width?: number | string;  // ширина блока
  height?: number | string; // высота блока
  circle?: boolean;         // круглый блок (для аватара)
  className?: string;       // дополнительные классы
}

export const Skeleton = ({
  width = "100%",
  height = 20,
  circle = false,
  className,
}: SkeletonProps) => {
  return (
    <div
      className={clsx("skeleton", { "skeleton--circle": circle }, className)}
      style={{ width, height }}
    />
  );
};