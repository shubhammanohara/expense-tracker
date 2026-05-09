import HeroSection from "../components/HeroSection";
import RecentTransactionsSection from "../components/RecentTransactionsSection";
import TrendsSection from "../components/TrendsSection";
import { useAuthStore } from "../hooks/useAuthStore";

const getGreetingMessage = (name?: string) => {
  const hour = new Date().getHours();
  const userName = name || "there";
  if (hour < 12) return `Good morning, ${userName}`;
  if (hour < 17) return `Good afternoon, ${userName}`;
  if (hour < 21) return `Good evening, ${userName}`;
  if (hour < 23) return `Hello, ${userName}`;
  return `Night owl, ${userName} 🌙`;
};

export const Dashboard = () => {
  const { user } = useAuthStore.getState();
  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {getGreetingMessage(user?.name)}
        </h1>
        <p className={"text-s mt-1"}>Here's what's happening with your money.</p>
      </section>

      {/* Hero Summary Section */}
      <HeroSection />

      {/* Analytics & Trends Section */}
      <TrendsSection />

      {/* Recent Transactions */}
      <RecentTransactionsSection />
    </div>
  );
};

export default Dashboard;
