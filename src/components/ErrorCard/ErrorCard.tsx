import { AlertTriangle, RefreshCcw } from "lucide-react";
import { FC } from "react";

type ErrorCardProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

const ErrorCard: FC<ErrorCardProps> = ({
  title = "Unable to load data",
  message = "Something went wrong. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`p-6 min-h-80 flex items-center justify-center w-full ${className}`}
    >
      <div className="text-center space-y-5">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/15">
          <AlertTriangle className="h-6 w-6 text-rose-300" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center mt-5 rounded-full px-4 py-2 text-sm font-medium bg-secondary text-surface hover:bg-secondary/80 transition-all justify-center gap-2 group active:scale-95 duration-150"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorCard;
