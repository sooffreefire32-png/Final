import React, { useState, useMemo } from "react";
import { LucideIcon } from "./LucideIcon";
import { Tool, Category } from "../types";
import { CORE_TOOLS, CATEGORIES } from "../utils/seoData";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  onSelectTool: (slug: string) => void;
}

// Define working tools that are fully bound and functional in our application
const WORKING_SLUGS = [
  "qr-code-generator",
  "qr-code-scanner",
  "barcode-generator",
  "image-compressor",
  "image-converter",
  "password-generator",
  "unit-converter",
  "calculators",
  "word-counter",
  "case-converter"
];

// Curate the active working tools list
const WORKING_TOOLS = CORE_TOOLS.filter(tool => WORKING_SLUGS.includes(tool.slug));

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Custom high-conversion CTA copy for each tool to make them feel interactive
  const getToolCtaText = (slug: string) => {
    switch (slug) {
      case "qr-code-generator": return "Create QR Code";
      case "qr-code-scanner": return "Scan QR Code";
      case "barcode-generator": return "Generate Barcode";
      case "image-compressor": return "Compress Image";
      case "image-converter": return "Convert Image";
      case "password-generator": return "Secure Passwords";
      case "unit-converter": return "Convert Units";
      case "calculators": return "Open Calculator";
      case "word-counter": return "Count Words";
      case "case-converter": return "Convert Case";
      default: return "Launch Utility";
    }
  };

  // Specific visual bullet features for each tool to detail true utility and trust
  const getToolFeatures = (slug: string) => {
    switch (slug) {
      case "qr-code-generator": return ["Custom colors & logo", "Static & permanent"];
      case "qr-code-scanner": return ["Live Webcam Scan", "Drag & Drop Images"];
      case "barcode-generator": return ["Code 128, EAN, UPC", "Download PDF/PNG"];
      case "image-compressor": return ["Under 50KB, 100KB", "No Upload Required"];
      case "image-converter": return ["PNG, JPG, WebP, PDF", "Prise quality preservation"];
      case "password-generator": return ["Entropy score meter", "100% Secure local generator"];
      case "unit-converter": return ["Storage & Lengths", "Real-time scaling list"];
      case "calculators": return ["Scientific & Loan", "Visual equations graph"];
      case "word-counter": return ["Real-time statistics", "Reading time estimator"];
      case "case-converter": return ["Sentence/UPPER/lower", "One-click copy paste"];
      default: return ["100% browser-safe", "Instant client computation"];
    }
  };

  // Category Tabs metadata mapping for the SaaS-style dashboard filter
  const TABS = useMemo(() => [
    { id: "all", label: "All Utilities", icon: "Grid", count: WORKING_TOOLS.length },
    { 
      id: "qr", 
      label: "QR & Barcodes", 
      icon: "QrCode", 
      count: WORKING_TOOLS.filter(t => t.category === "qr").length 
    },
    { 
      id: "image", 
      label: "Image Tools", 
      icon: "Image", 
      count: WORKING_TOOLS.filter(t => t.category === "image").length 
    },
    { 
      id: "security", 
      label: "Passwords", 
      icon: "Shield", 
      count: WORKING_TOOLS.filter(t => t.category === "password").length 
    },
    { 
      id: "calculators", 
      label: "Calculators", 
      icon: "Calculator", 
      count: WORKING_TOOLS.filter(t => t.category === "calculator").length 
    },
    { 
      id: "text", 
      label: "Text Utilities", 
      icon: "FileText", 
      count: WORKING_TOOLS.filter(t => t.category === "text").length 
    },
    { 
      id: "converters", 
      label: "Converters", 
      icon: "Scale", 
      count: WORKING_TOOLS.filter(t => t.category === "converter").length 
    },
  ], []);

  // Filter tools dynamically based on active filters and queries
  const filteredTools = useMemo(() => {
    return WORKING_TOOLS.filter(tool => {
      // Search matching
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getToolFeatures(tool.slug).some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category matching
      if (selectedCategory === "all") return true;
      if (selectedCategory === "qr" && tool.category === "qr") return true;
      if (selectedCategory === "image" && tool.category === "image") return true;
      if (selectedCategory === "security" && tool.category === "password") return true;
      if (selectedCategory === "calculators" && tool.category === "calculator") return true;
      if (selectedCategory === "text" && tool.category === "text") return true;
      if (selectedCategory === "converters" && tool.category === "converter") return true;

      return false;
    });
  }, [searchQuery, selectedCategory]);

  // Is the user viewing the unmodified natural home view (no query & tab is "all")?
  const isDefaultView = searchQuery === "" && selectedCategory === "all";

  // Curated lists for default home dashboard
  const popularTools = useMemo(() => WORKING_TOOLS.filter(t => t.isPopular), []);
  const recentlyAddedTools = useMemo(() => WORKING_TOOLS.filter(t => t.isLatest), []);

  return (
    <section className="relative py-12 md:py-20 text-center space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative premium ambient glow spheres */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl -z-10" />

      {/* Hero Header Block */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-slate-50 text-slate-800 text-[11px] font-extrabold uppercase tracking-widest mx-auto select-none shadow-sm font-mono">
          <LucideIcon name="ShieldCheck" size={13} className="text-slate-900" />
          <span>Local client-side execution • zero logs</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] font-sans tracking-tight">
          Tools for creators.<br />
          <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 bg-clip-text text-transparent">
            No servers. 100% private.
          </span>
        </h1>
        
        <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Generate assets, compress images, and run calculators instantly. All computations execute fully within your browser memory—your sensitive files and entries never touch a backend server.
        </p>
      </div>

      {/* SEARCH AND TABS CONTROL - SaaS Standard Panel */}
      <div className="space-y-6 pt-6 max-w-5xl mx-auto">
        
        {/* Unified High-Performance Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
            <LucideIcon name="Search" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search local tools, generators, calculators..."
            className="w-full pl-11.5 pr-11 py-3.5 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-slate-950 transition-all font-semibold shadow-sm shadow-slate-100 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-900"
              title="Clear search"
            >
              <LucideIcon name="X" size={15} />
            </button>
          )}
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none select-none max-w-full">
          {TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  // Highlight the catalog when changing category
                  const el = document.getElementById("catalog-heading");
                  if (el && searchQuery) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`relative flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 border ${
                  isActive
                    ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-950/10"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <LucideIcon name={tab.icon} size={13} className={isActive ? "text-white" : "text-slate-400"} />
                <span>{tab.label}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-slate-800 text-white/90" : "bg-slate-100 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* CATALOG PRESENTATION AREA */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 pt-8 text-left space-y-12">
        
        {/* DEFAULT VIEW: Structured Curated Sections */}
        {isDefaultView && (
          <>
            {/* SECTION 1: Popular Tools (3 Column Layout) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">
                    Popular SaaS Utilities
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                  Most Visited
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularTools.map((tool) => (
                  <motion.div
                    key={tool.slug}
                    layout
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onClick={() => onSelectTool(tool.slug)}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-950 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      {/* Top Action Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                          <LucideIcon name={tool.icon} size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                          <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                          Popular
                        </span>
                      </div>

                      {/* Tool Title & Description */}
                      <div className="space-y-1.5 mb-5">
                        <h3 className="text-base font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {tool.shortDesc}
                        </p>
                      </div>

                      {/* Explicit Custom Feature List */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6 select-none">
                        {getToolFeatures(tool.slug).map((feature, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-150 py-0.5 px-2.5 rounded-md">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Primary Action Bar */}
                    <div className="w-full">
                      <div className="w-full py-2.5 px-4 bg-slate-50 text-slate-900 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border border-slate-200 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center gap-1.5 active:scale-98">
                        <span>{getToolCtaText(tool.slug)}</span>
                        <LucideIcon name="ArrowRight" size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SECTION 2: Recently Added (Featured horizontal banner) */}
            {recentlyAddedTools.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">
                    Recently Added
                  </h2>
                </div>

                {recentlyAddedTools.map((tool) => (
                  <motion.div
                    key={tool.slug}
                    layout
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    onClick={() => onSelectTool(tool.slug)}
                    className="group relative p-5 md:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-950 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                  >
                    <div className="flex items-start md:items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                        <LucideIcon name={tool.icon} size={18} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-extrabold text-slate-950 tracking-tight">
                            {tool.name}
                          </h3>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded font-mono uppercase">
                            New Release
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                          {tool.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                      <div className="hidden sm:flex items-center gap-1.5">
                        {getToolFeatures(tool.slug).map((feature, idx) => (
                          <span key={idx} className="text-[10px] font-semibold text-slate-400 border border-slate-100 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="py-2 px-4 rounded-xl bg-slate-900 group-hover:bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-97">
                        <span>Open tool</span>
                        <LucideIcon name="ArrowRight" size={11} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* SECTION 3: All Tools Catalog */}
            <div className="space-y-4 pt-4" id="catalog-heading">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <LucideIcon name="Grid" size={15} className="text-slate-400" />
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">
                  All Utilities Directory
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {WORKING_TOOLS.map((tool) => (
                  <motion.div
                    key={tool.slug}
                    layout
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    onClick={() => onSelectTool(tool.slug)}
                    className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-950 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                          <LucideIcon name={tool.icon} size={16} />
                        </div>
                        <span className="text-[9px] font-extrabold font-mono text-slate-400 uppercase tracking-wider">
                          {tool.category === "qr" ? "QR & Barcode" : tool.category === "image" ? "Media" : tool.category === "password" ? "Security" : tool.category === "text" ? "Text" : tool.category}
                        </span>
                      </div>

                      <div className="space-y-1 mb-4">
                        <h4 className="text-sm font-extrabold text-slate-950 tracking-tight group-hover:text-slate-950">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {tool.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">
                        {getToolFeatures(tool.slug)[0] || "100% Client-side"}
                      </span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                        <span>Launch</span>
                        <LucideIcon name="ChevronRight" size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SEARCHED / FILTERED VIEW: Dynamic Uniform Grid */}
        {!isDefaultView && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-950">
                Found {filteredTools.length} Matching {filteredTools.length === 1 ? "Utility" : "Utilities"}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
              >
                Reset filters
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <motion.div
                      key={tool.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      onClick={() => onSelectTool(tool.slug)}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-950 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        {/* Top Icon Block */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                            <LucideIcon name={tool.icon} size={18} />
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            {tool.isPopular && (
                              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full select-none">
                                Popular
                              </span>
                            )}
                            {tool.isLatest && (
                              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full select-none">
                                New
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5 mb-4">
                          <h3 className="text-base font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            {tool.shortDesc}
                          </p>
                        </div>

                        {/* Specific Features List */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-6 select-none">
                          {getToolFeatures(tool.slug).map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-150 py-0.5 px-2.5 rounded-md">
                              <span className="w-1 h-1 rounded-full bg-slate-400" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Primary CTA button */}
                      <div className="w-full">
                        <div className="w-full py-2.5 px-4 bg-slate-50 text-slate-900 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border border-slate-200 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center gap-1.5 active:scale-98">
                          <span>{getToolCtaText(tool.slug)}</span>
                          <LucideIcon name="ArrowRight" size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-250 p-8 space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <LucideIcon name="Search" size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                    No matching utilities found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    We couldn't find any local utilities matching your keywords. Try searching for "QR", "Image", "PDF" or "Password".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-2 text-xs font-bold text-slate-900 border border-slate-300 bg-white hover:bg-slate-50 py-2 px-4 rounded-xl transition-all shadow-sm active:scale-98"
                  >
                    Clear Search Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
