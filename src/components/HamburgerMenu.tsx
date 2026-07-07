import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import { CATEGORIES, CORE_TOOLS } from "../utils/seoData";
import { Tool } from "../types";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getToolsByCategory = (catId: string) => {
    return CORE_TOOLS.filter(
      (tool) =>
        tool.category === catId &&
        (searchQuery === "" ||
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleToolClick = (slug: string) => {
    onSelectTool(slug);
    onClose();
  };

  // Primary mobile shortcuts
  const primaryShortcuts = [
    { name: "QR Code Generator", slug: "qr-code-generator", icon: "QrCode", color: "text-blue-600 bg-blue-50" },
    { name: "Image Compressor", slug: "image-compressor", icon: "Image", color: "text-emerald-600 bg-emerald-50" },
    { name: "Secure Passwords", slug: "password-generator", icon: "Shield", color: "text-indigo-600 bg-indigo-50" },
    { name: "SEO Metadata Tools", slug: "seo-tools", icon: "Search", color: "text-violet-600 bg-violet-50" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay with elegant fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[9998]"
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          {/* Slide-out Sidebar Drawer from Right (iOS/SaaS Standard) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-slate-200 z-[9999] shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-150 flex items-center justify-between">
              <div className="flex items-center gap-2.5 select-none">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <LucideIcon name="Sparkles" size={15} className="text-blue-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider font-sans">
                    QRToolkit
                  </h3>
                  <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 block mt-0.5">
                    ALL UTILITIES
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <LucideIcon name="X" size={15} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
              
              {/* SECTION 1: Primary Shortcuts (Large accessible touch targets, min 48px height) */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 block">
                  Popular Shortcuts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {primaryShortcuts.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => handleToolClick(item.slug)}
                      className="flex flex-col items-start gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/50 transition-all text-left cursor-pointer active:scale-97 group min-h-[85px] justify-between"
                    >
                      <div className={`p-1.5 rounded-lg ${item.color}`}>
                        <LucideIcon name={item.icon} size={15} />
                      </div>
                      <span className="text-xs font-bold text-slate-900 leading-tight">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SEARCH INPUT */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 block">
                  Find a Utility
                </span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <LucideIcon name="Search" size={13} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search all local utilities..."
                    className="w-full pl-8.5 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:ring-1.5 focus:ring-slate-900 focus:bg-white transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <LucideIcon name="X" size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* SECTION 2: Full Categorized Index */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 block">
                  Categorized Directory
                </span>
                <div className="space-y-4">
                  {CATEGORIES.map((category) => {
                    const tools = getToolsByCategory(category.id);
                    if (tools.length === 0) return null;

                    return (
                      <div key={category.id} className="space-y-1.5">
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                            {category.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                          {tools.map((tool) => (
                            <button
                              key={tool.slug}
                              onClick={() => handleToolClick(tool.slug)}
                              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all text-left cursor-pointer group min-h-[44px]"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 text-slate-600 group-hover:text-slate-950 transition-all">
                                  <LucideIcon name={tool.icon} size={13} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-slate-950 transition-colors truncate">
                                  {tool.name}
                                </span>
                              </div>
                              <LucideIcon
                                name="ChevronRight"
                                size={11}
                                className="text-slate-400 group-hover:text-slate-800 transition-all shrink-0"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Empty state when query returns zero tools */}
              {CATEGORIES.every((cat) => getToolsByCategory(cat.id).length === 0) && (
                <div className="text-center py-8 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                    <LucideIcon name="Search" size={15} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    No matching utilities
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Try searching for another keyword.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Premium CTA */}
            <div className="p-5 border-t border-slate-150 bg-slate-50/50 space-y-3">
              <button
                onClick={() => handleToolClick("qr-code-generator")}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <span>Create Custom QR Code</span>
                <LucideIcon name="ArrowRight" size={12} className="text-slate-300" />
              </button>
              <p className="text-[9px] text-slate-400 text-center leading-relaxed">
                All generators execute fully in memory on your local browser.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

