/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ignore tiny scrolls (prevents jitter)
      if (Math.abs(currentScrollY - lastScrollY) < 8) return;

      if (currentScrollY > lastScrollY) {
        // scrolling DOWN → hide
        setShow(false);
      } else {
        // scrolling UP → show
        setShow(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-surface flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50  ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/user/100/100"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="font-headline font-extrabold tracking-tighter text-2xl text-primary">
          SpendWise
        </div>
      </div>
      <button className="text-primary-container hover:bg-white/5 transition-colors p-2 rounded-full scale-95 duration-200">
        <Bell className="w-6 h-6" />
      </button>
    </header>
  );
}
