import type { ElementType, ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Heading = ({
  level = 1,
  children,
  className = "",
  id,
}: HeadingProps) => {
  const Tag = `h${level}` as ElementType;

  const sizeClasses: Record<HeadingLevel, string> = {
    1: "text-4xl font-extrabold tracking-tight sm:text-5xl",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return (
    <Tag id={id} className={`${sizeClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};
