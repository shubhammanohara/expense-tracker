import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Search,
  X,
} from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/src/utils/common";

//size 18 for md inputs
//size 20 for lg inputs

/* ======================================================
   COMMON FIELD WRAPPER
====================================================== */

type BaseFieldProps = {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
};

function FieldWrapper({
  label,
  error,
  hint,
  children,
}: React.PropsWithChildren<BaseFieldProps>) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-on-surface-variant">
          {label}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  );
}

const baseInputClass =
  "w-full h-14 rounded-lg bg-surface-container-high px-5 text-on-surface outline-none transition-all placeholder:text-on-surface-variant/50 focus:bg-surface-container-highest focus:ring-2 focus:ring-primary/25 disabled:opacity-50 disabled:pointer-events-none";

/* ======================================================
   INPUT COMPONENT
====================================================== */

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const isDateField = type === "date" || type === "datetime-local" || type === "month";

    const finalType = isPassword && showPassword ? "text" : type;

    return (
      <FieldWrapper label={label} error={error} hint={hint}>
        <div className="relative">
          <input
            ref={ref}
            type={finalType}
            className={cn(baseInputClass, isPassword && "pr-14", className)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {/* Calendar Icon */}
          {isDateField && (
            <CalendarDays
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
          )}
        </div>
      </FieldWrapper>
    );
  },
);

Input.displayName = "Input";

/* ======================================================
   SELECT COMPONENT
====================================================== */

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  BaseFieldProps & {
    options: {
      label: string;
      value: string;
    }[];
    placeholder?: string;
  };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, className, options, placeholder = "Select option", ...props },
    ref,
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
      <FieldWrapper label={label} error={error} hint={hint}>
        <div className="relative">
          <select
            ref={ref}
            className={cn(baseInputClass, "h-14 appearance-none pr-12", className)}
            defaultValue=""
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-transform duration-200">
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </FieldWrapper>
    );
  },
);

Select.displayName = "Select";

/* =========================================
   TEXTAREA COMPONENT
========================================= */

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className, rows = 5, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} hint={hint}>
        <div className="relative">
          <textarea
            ref={ref}
            rows={rows}
            className={cn(baseInputClass, "min-h-32 py-4 resize-none")}
            {...props}
          />
        </div>
      </FieldWrapper>
    );
  },
);

TextArea.displayName = "TextArea";

/* =========================================
   SEARCH BAR COMPONENT
========================================= */

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
  onClear?: () => void;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      label,
      error,
      hint,
      className,
      onClear,
      value,
      placeholder = "Search...",
      ...props
    },
    ref,
  ) => {
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
      <FieldWrapper label={label} error={error} hint={hint}>
        <div className="relative">
          {/* Left Icon */}
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />

          {/* Input */}
          <input
            ref={ref}
            type="search"
            value={value}
            placeholder={placeholder}
            className={cn(
              baseInputClass,
              "h-14 pl-12 pr-12",
              "[&::-webkit-search-cancel-button]:hidden",
              className,
            )}
            {...props}
          />

          {/* Clear */}
          {hasValue && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </FieldWrapper>
    );
  },
);

SearchBar.displayName = "SearchBar";
