/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Button from "./components/Button";
import Header from "./components/Header";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthMe } from "./hooks/useAuth";
import AddExpense from "./screens/AddExpense";
import Dashboard from "./screens/Dashboard";
import History from "./screens/History";
import ProfileSettings from "./screens/Settings";

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { data: user, isLoading } = useAuthMe();
  console.log("Authenticated user:", user);

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

  useEffect(() => {
    if (!user && !isLoading) navigate("/login");
  }, [user, navigate, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 pb-32">
      {user && <Header />}

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
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={!!user} isLoading={isLoading} />
                }
              >
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
              </Route>
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {user && <Navigation />}

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
