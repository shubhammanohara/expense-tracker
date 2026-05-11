import { cn } from "@/src/utils/common";

interface Props {
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const CategoryIcon = ({ icon, color, bg }: Props) => {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        "ring-1 ring-white/6",
        "shadow-[0_2px_12px_rgba(0,0,0,0.12)]",
        "backdrop-blur-sm",
        "data-[active=true]:ring-primary/40",
        "data-[active=true]:bg-primary/15",
        "data-[active=true]:shadow-[0_0_0_1px_rgba(78,222,163,0.15)]",
        bg,
      )}
    >
      <div
        className={cn("h-6 w-6", "[&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-[2.2]", color)}
      >
        {icon}
      </div>
    </div>
  );
};

export default CategoryIcon;
