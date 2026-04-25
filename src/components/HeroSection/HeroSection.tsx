import React, { FC, ReactNode } from "react";

interface HeroSectionProps {
  children?: ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  return (
    <section className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
      <div className="glass-card rounded-lg p-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">{children}</div>
      </div>
    </section>
  );
};

export default HeroSection;
