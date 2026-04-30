import { Home, PlusCircle, ReceiptText, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import NavButton from "./NavButton";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-2 pt-2 bg-surface/40 backdrop-blur-xl rounded-t-4xl shadow-[0_-16px_32px_rgba(0,0,0,0.4)]">
      <NavButton
        active={activeTab === "/"}
        onClick={() => navigate("/")}
        icon={<Home />}
        label="Home"
      />

      <NavButton
        active={activeTab === "/add"}
        onClick={() => navigate("/add")}
        icon={<PlusCircle />}
        label="Add"
      />

      <NavButton
        active={activeTab === "/history"}
        onClick={() => navigate("/history")}
        icon={<ReceiptText />}
        label="History"
      />

      <NavButton
        active={activeTab === "/settings"}
        onClick={() => navigate("/settings")}
        icon={<Settings />}
        label="Settings"
      />
    </nav>
  );
};

export default Navigation;
