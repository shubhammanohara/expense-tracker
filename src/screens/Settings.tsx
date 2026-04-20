/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Edit2, Wallet, Moon, FileOutput, Bell, HelpCircle, ShieldCheck, LogOut, ChevronRight, ExternalLink } from 'lucide-react';

export default function ProfileSettings({ theme, onThemeToggle }: { theme: 'dark' | 'light', onThemeToggle: () => void }) {
  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col items-center text-center space-y-4 pt-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-primary-container/20">
            <img 
              alt="Alex Rivers" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/user/300/300"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-primary text-surface p-1.5 rounded-lg shadow-lg">
            <Edit2 className="w-4 h-4 fill-surface" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-headline font-bold text-on-surface">Alex Rivers</h2>
          <p className="text-on-surface-variant font-medium">Premium Member</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">General Account</h3>
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
            trailing={<Toggle checked={theme === 'dark'} onChange={onThemeToggle} />}
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
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">Notifications</h3>
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
        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary ml-1">Support & Legal</h3>
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
        <button className="w-full bg-surface-container-high text-red-400 hover:bg-red-400/10 border border-red-400/10 transition-all font-bold py-4 rounded-lg flex items-center justify-center gap-2 group active:scale-95 duration-150">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <p className="text-center text-[10px] font-body font-semibold uppercase tracking-widest text-on-surface-variant/40 mt-8">Version 2.4.0 (Emerald Reserve)</p>
      </section>
    </div>
  );
}

function SettingsItem({ icon, title, subtitle, trailing }: any) {
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

function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${checked ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'ml-auto' : ''}`}></div>
    </button>
  );
}
