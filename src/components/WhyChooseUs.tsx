import React from "react";
import { LucideIcon } from "./LucideIcon";

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Local data execution",
      desc: "All operations run inside your browser. Whether you are generating QR codes or compressing large images, processing occurs locally so your sensitive information never leaves your device.",
      icon: "Lock"
    },
    {
      title: "Zero layout shifts",
      desc: "Our responsive components are structured with strict height bounds. This eliminates cumulative layout shifts, ensuring a stable visual state during asset loading.",
      icon: "Zap"
    },
    {
      title: "Designed for touch and click",
      desc: "Every control is optimized for click precision and mobile responsiveness. Touch targets maintain a minimum 44px height to guarantee accessibility on smaller screens.",
      icon: "Smartphone"
    }
  ];

  return (
    <section className="py-12 md:py-16 max-w-5xl mx-auto px-4 md:px-6 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Designed for instant execution and absolute security.
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          We combine local in-browser computation with clean, accessible design to provide a reliable, serverless utility platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
              <LucideIcon name={benefit.icon} size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {benefit.title}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
