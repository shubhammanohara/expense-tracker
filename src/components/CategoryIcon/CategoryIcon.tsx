import { ReactNode } from "react";

import { cn } from "@/src/utils/common";

interface CategoryIconProps {
  icon: ReactNode;
  color: string;
  bg: string;
}

export const CategoryIcon = ({ icon, color, bg }: CategoryIconProps) => {
  return (
    <div
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center rounded-full",
        "transition-all duration-300 ease-in-out",

        "bg-surface-container border border-surface-container-highest shadow-sm",

        // HOVER: Subtle lift
        "hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-opacity",
          "opacity-10 dark:opacity-20",
          bg,
        )}
      />

      {/* ICON WRAPPER */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center h-5 w-5",
          "transition-transform duration-300 group-hover:scale-110",
          "[&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-[2.5]",
          color,
        )}
      >
        {icon}
      </div>
    </div>
  );
};

export default CategoryIcon;
