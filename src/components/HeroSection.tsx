import React from "react";
import { RYF_ASSETS } from "@/lib/ryf-data";

interface HeroSectionProps {
  onOpenPlayer?: () => void;
  onOpenSchedule?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section
      id="hero"
      className="relative w-full aspect-[3/4] sm:aspect-[16/9] min-h-[460px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px] flex items-center bg-ryf-navy text-white overflow-hidden"
    >
      {/* Background Photography: Mobile uses user-provided portrait poster, Desktop uses horizontal billboard */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 639px)" srcSet={RYF_ASSETS.heroBgMobile} />
          <img
            src={RYF_ASSETS.heroBg}
            alt="RYF Radio - Le Top du Divertissement"
            className="w-full h-full object-cover object-top sm:object-center"
          />
        </picture>
      </div>

      {/* Hero placeholder maintaining height and responsiveness */}
      <div className="relative z-10 w-full" aria-hidden="true" />
    </section>
  );
};
