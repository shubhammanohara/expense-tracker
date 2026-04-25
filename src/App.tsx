/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, PlusCircle, ReceiptText, Settings } from "lucide-react";
import Dashboard from "./screens/Dashboard";
import History from "./screens/History";
import AddExpense from "./screens/AddExpense";
import ProfileSettings from "./screens/Settings";
import Header from "./components/Header";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "add" | "history" | "settings"
  >("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;
      case "history":
        return <History />;
      case "add":
        return (
          <AddExpense
            onCancel={() => setActiveTab("home")}
            onSuccess={() => setActiveTab("home")}
          />
        );
      case "settings":
        return (
          <ProfileSettings
            theme={theme}
            onThemeToggle={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 pb-32">
      <Header />

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Button (only on home) */}
      {activeTab === "home" && (
        <button
          onClick={() => setActiveTab("add")}
          className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-surface rounded-full shadow-[0_12px_24px_rgba(78,222,163,0.4)] flex items-center justify-center z-50 active:scale-90 transition-transform"
        >
          <PlusCircle className="w-8 h-8" />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/40 backdrop-blur-xl rounded-t-[32px] shadow-[0_-16px_32px_rgba(0,0,0,0.4)]">
        <NavButton
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
          icon={<Home />}
          label="Home"
        />
        <NavButton
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
          icon={<PlusCircle />}
          label="Add"
        />
        <NavButton
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
          icon={<ReceiptText />}
          label="History"
        />
        <NavButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          icon={<Settings />}
          label="Settings"
        />
      </nav>
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all ${
        active
          ? "bg-primary/20 text-primary rounded-full px-5 py-2 scale-100"
          : "text-on-surface-variant opacity-60 hover:opacity-100 scale-90"
      }`}
    >
      <div className={active ? "[&>svg]:fill-primary" : ""}>{icon}</div>
      <span className="font-body text-[10px] font-semibold uppercase tracking-widest mt-1">
        {label}
      </span>
    </button>
  );
}
