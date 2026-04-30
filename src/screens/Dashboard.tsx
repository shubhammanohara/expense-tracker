import HeroSection from "../components/HeroSection";
import RecentTransactionsSection from "../components/RecentTransactionsSection";
import TrendsSection from "../components/TrendsSection";

export const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Good Morning, Alex Danvers
        </h1>
        <p className={"text-s mt-1"}>Here's what's happening with your money today.</p>
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
