import { FC } from "react";

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: FC<NavButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center justify-center transition-all ${
        active
          ? "bg-primary/20 text-primary rounded-full px-5 py-2 scale-100"
          : "text-on-surface-variant opacity-60 hover:opacity-100 scale-90"
      }`}
    >
      <div>{icon}</div>

      <span className="font-body text-[10px] font-semibold uppercase tracking-widest mt-1">
        {label}
      </span>
    </button>
  );
};

export default NavButton;
