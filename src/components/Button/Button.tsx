import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

{
  /* For your current button sizes:
     sm = h-9   (36px)
     md = h-11  (44px)
     lg = h-14  (56px) 
     Best Icon Sizes
     Use this scale:
     sm → 16px
     md → 18px
     lg → 20px
     */
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "outline-primary"
  | "outline-secondary"
  | "outline-tertiary"
  | "outline-danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  iconOnly?: boolean;
};

const sizes = {
  sm: "h-9 px-4 text-sm rounded-full gap-2",
  md: "h-11 px-5 text-sm rounded-full gap-2",
  lg: "h-14 px-6 text-base rounded-full gap-2.5",
};

const iconOnlySizes = {
  sm: "h-9 w-9 p-0 aspect-square shrink-0 rounded-full",
  md: "h-11 w-11 p-0 aspect-square shrink-0 rounded-full",
  lg: "h-14 w-14 p-0 aspect-square shrink-0 rounded-full",
};

const variants = {
  primary:
    "bg-primary text-surface shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.95]",

  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-[0.95]",

  tertiary:
    "bg-transparent text-on-surface hover:bg-surface-container-low active:scale-[0.95]",

  danger:
    "bg-red-400 text-surface shadow-lg shadow-red-500/20 hover:brightness-105 active:scale-[0.95]",

  "outline-primary":
    "border-2 border-primary/35 text-primary bg-transparent hover:bg-primary-container/10 active:scale-[0.95]",

  "outline-secondary":
    "border-2 border-on-surface/10 text-on-surface bg-transparent hover:bg-surface-container-low active:scale-[0.95]",

  "outline-tertiary":
    "border-2 border-transparent text-on-surface-variant bg-transparent hover:bg-surface-container-low active:scale-[0.95]",

  "outline-danger":
    "border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-400/10 active:scale-[0.95]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "primary",
      loading = false,
      iconOnly = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/30",
          "disabled:pointer-events-none disabled:opacity-50",
          iconOnly ? iconOnlySizes[size] : sizes[size],
          variants[variant],
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
