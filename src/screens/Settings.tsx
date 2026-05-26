import {
  Bell,
  ChevronRight,
  Edit2,
  ExternalLink,
  FileOutput,
  HelpCircle,
  LogOut,
  Moon,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Toggle from "../components/Toggle";
import { useAuthStore } from "../hooks/useAuthStore";

export default function ProfileSettings({
  theme,
  onThemeToggle,
}: {
  theme: "dark" | "light";
  onThemeToggle: () => void;
}) {
  const { user, logout } = useAuthStore.getState();

  const navigate = useNavigate();
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col items-center text-center space-y-4 pt-6">
        <div className="relative">
          {/* Avatar Ring */}
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary via-secondary/80 to-tertiary/80 p-0.75 shadow-[0_0_40px_rgba(78,222,163,0.18)]">
            {/* Inner Avatar */}
            <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center relative overflow-hidden">
              {/* Soft Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(78,222,163,0.18),transparent_65%)]" />

              {/* Initials */}
              <span className="relative z-10 text-4xl font-black font-headline tracking-tight text-on-surface">
                {initials}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <button className="absolute -bottom-1 -right-1 bg-primary text-surface p-2 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
            <Edit2 className="w-4 h-4 fill-surface" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-headline font-bold text-on-surface">
            {user?.name}
          </h2>
          <p className="text-on-surface-variant font-medium">Premium Member</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">
          General Account
        </h3>
        <div className="glass-card rounded-lg p-1 space-y-1">
          <SettingsItem
            icon={<Wallet className="text-secondary" />}
            title="Currency selector"
            subtitle="Default transaction currency"
            trailing={
              <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-primary">USD</span>
                <ChevronRight className="w-4 h-4 opacity-40 rotate-90" />
              </div>
            }
          />
          <SettingsItem
            icon={<Moon className="text-primary" />}
            title="Dark mode toggle"
            subtitle="Switch theme appearance"
            trailing={<Toggle checked={theme === "dark"} onChange={onThemeToggle} />}
          />
          <SettingsItem
            icon={<FileOutput className="text-tertiary" />}
            title="Export to CSV / Excel"
            subtitle="Download your financial history"
            trailing={<ChevronRight className="w-4 h-4 opacity-40" />}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">
          Notifications
        </h3>
        <div className="glass-card rounded-lg p-1 space-y-1">
          <SettingsItem
            icon={<Bell className="text-secondary" />}
            title="Smart Alerts"
            subtitle="Budget limits & bills"
            trailing={<Toggle checked onChange={() => {}} />}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">
          Support & Legal
        </h3>
        <div className="glass-card rounded-lg p-1 space-y-1">
          <SettingsItem
            icon={<HelpCircle className="text-on-surface-variant" />}
            title="Help Center"
            trailing={<ExternalLink className="w-4 h-4 opacity-40" />}
          />
          <SettingsItem
            icon={<ShieldCheck className="text-on-surface-variant" />}
            title="Privacy Policy"
            trailing={<ChevronRight className="w-4 h-4 opacity-40" />}
          />
        </div>
      </section>

      <section className="pt-4">
        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          variant="outline-danger"
          size="lg"
          className="w-full"
        >
          <LogOut />
          Logout
        </Button>
        <p className="text-center text-[10px] font-body font-semibold uppercase tracking-widest text-on-surface-variant/40 mt-8">
          Version 2.4.0 (Emerald Reserve)
        </p>
      </section>
    </div>
  );
}

function SettingsItem({
  icon,
  title,
  subtitle,
  trailing,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-on-surface">{title}</p>
          {subtitle && <p className="text-xs text-on-surface-variant">{subtitle}</p>}
        </div>
      </div>
      {trailing}
    </div>
  );
}
