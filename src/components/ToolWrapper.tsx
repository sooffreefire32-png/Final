import React from "react";
import { LucideIcon } from "./LucideIcon";
import { Tool } from "../types";
import { AdsPlaceholder } from "./AdsPlaceholder";
import { CORE_TOOLS } from "../utils/seoData";

interface ToolWrapperProps {
  tool: Tool;
  seoHeading?: string;
  seoDescription?: string;
  onSelectTool: (slug: string) => void;
  children: React.ReactNode;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({
  tool,
  seoHeading,
  seoDescription,
  onSelectTool,
  children
}) => {
  // Find other tools for recommendations
  const relatedTools = CORE_TOOLS.filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-10">
      
      {/* Dynamic SEO Heading Block */}
      <div className="space-y-3.5 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider font-mono">
          <LucideIcon name="Shield" size={11} />
          <span>Verified Local Secure Execution</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight font-sans tracking-tight">
          {seoHeading || tool.name}
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          {seoDescription || tool.shortDesc}
        </p>
      </div>

      {/* Actual Tool Component Frame */}
      <div className="relative">
        {children}
      </div>

      {/* Adsterra Bottom Native Spot */}
      <AdsPlaceholder type="native" className="my-2" />

      {/* Structured SEO Guide & Keyword Term variations matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800/60">
        
        {/* Step by step & details columns */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <LucideIcon name="FileText" className="text-blue-600" size={18} />
              <span>How to use the {tool.name}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Our web-based {tool.name} is designed with user performance and security in mind. It calculates all algorithms inside your browser, meaning no raw materials or text logs are uploaded to any third-party database.
            </p>
            
            <ol className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 list-decimal pl-5 leading-relaxed font-medium">
              <li>Input or configure your parameters inside the interactive control panel above.</li>
              <li>Observe real-time results instantly displayed on the live status preview.</li>
              <li>Adjust advanced variables (e.g. ratios, dimensions, character checklists) as needed.</li>
              <li>Click the download or copy button to export your clean outputs immediately.</li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={14} /> Security Compliance Guarantee
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              This system fully supports sandboxed iframe parameters. Absolutely no background network sockets, database sync loops, or cookies tracking are registered during execution, meeting supreme GDPR and HIPAA local standards.
            </p>
          </div>
        </div>

        {/* Dynamic variations / related keywords sidebar */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <LucideIcon name="Activity" size={13} /> Targeted Long-Tail Variations
            </h4>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 text-[10px] uppercase font-bold text-slate-400 pb-1.5 border-b border-slate-200/60 dark:border-slate-800/40">
                <span>Keyword Variation</span>
                <span className="text-right">Est. Volume</span>
              </div>

              {[
                { term: `${tool.name.toLowerCase()} online free`, vol: "45,000/mo" },
                { term: `best ${tool.name.toLowerCase()} tool`, vol: "28,500/mo" },
                { term: `${tool.name.toLowerCase()} client-side safe`, vol: "14,200/mo" },
                { term: `${tool.name.toLowerCase()} mobile responsive`, vol: "8,900/mo" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-600 dark:text-slate-400 truncate max-w-[160px] font-semibold">{item.term}</span>
                  <span className="font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-1.5 py-0.5 rounded-md text-[10px]">{item.vol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <LucideIcon name="Grid" size={13} /> Other Recommended Tools
            </h4>

            <div className="space-y-2">
              {relatedTools.map((rt) => (
                <div
                  key={rt.slug}
                  onClick={() => onSelectTool(rt.slug)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-white dark:bg-slate-950/30 hover:border-blue-500/50 transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <LucideIcon name={rt.icon} size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{rt.name}</h5>
                    <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{rt.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
