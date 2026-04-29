/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlusCircle } from "lucide-react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import History from "./screens/History";
import AddExpense from "./screens/AddExpense";
import ProfileSettings from "./screens/Settings";
import Header from "./components/Header";
import Login from "./components/Login";
import Button from "./components/Button";
import Navigation from "./components/Navigation";
import { useAuthMe } from "./hooks/useAuth";

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { data: user, isLoading } = useAuthMe();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const activeTab = location.pathname;

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (!user) {
    return (
      <div className="min-h-screen bg-surface">
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 pb-32">
      <Header />

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/add"
                element={
                  <AddExpense
                    onCancel={() => navigate("/")}
                    onSuccess={() => navigate("/")}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <ProfileSettings
                    theme={theme}
                    onThemeToggle={() =>
                      setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                    }
                  />
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation />

      {/* Floating Button */}
      {activeTab === "/" && (
        <>
          <Button
            iconOnly
            size="lg"
            className="fixed bottom-20 right-6 shadow-[0_12px_24px_rgba(78,222,163,0.4)] z-50"
            onClick={() => navigate("/add")}
          >
            <PlusCircle size={30} />
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
