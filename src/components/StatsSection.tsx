import React from "react";
import { LucideIcon } from "./LucideIcon";

export const StatsSection: React.FC = () => {
  return (
    <section className="py-8 border-y border-slate-150 max-w-5xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Data uploads", value: "0", desc: "Your files never leave your device", icon: "ShieldCheck" },
          { label: "Local processing", value: "< 1ms", desc: "Immediate browser execution", icon: "Zap" },
          { label: "Unrestricted access", value: "100% Free", desc: "No subscriptions or signups", icon: "CheckCircle" },
          { label: "Standard outputs", value: "Export ready", desc: "Clean PNG, SVG, CSV and JSON", icon: "Grid" }
        ].map((item, idx) => (
          <div key={idx} className="space-y-1.5 p-4 rounded-xl hover:bg-slate-50/60 transition-all duration-300">
            <div className="mx-auto w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <LucideIcon name={item.icon} size={15} />
            </div>
            <span className="text-2xl font-black text-slate-900 font-sans block">
              {item.value}
            </span>
            <p className="text-xs font-bold text-slate-800">
              {item.label}
            </p>
            <p className="text-[10px] text-slate-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
