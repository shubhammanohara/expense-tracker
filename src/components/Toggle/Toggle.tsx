import { FC } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

const Toggle: FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${checked ? "bg-primary-container" : "bg-surface-container-highest"}`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? "ml-auto" : ""}`}
      ></div>
    </button>
  );
};

export default Toggle;
