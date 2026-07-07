import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import { CORE_TOOLS } from "../utils/seoData";
import { Tool } from "../types";
import { HamburgerMenu } from "./HamburgerMenu";

interface NavbarProps {
  onSelectTool: (slug: string) => void;
  onGoHome: () => void;
  currentTool: Tool | null;
}

const DROPDOWN_CATEGORIES = [
  {
    id: "generators",
    label: "Generators",
    items: [
      { name: "QR Code Generator", slug: "qr-code-generator", icon: "QrCode", desc: "Create high-resolution custom QR codes" },
      { name: "Barcode Generator", slug: "barcode-generator", icon: "Barcode", desc: "Generate retail & logistics barcodes" },
      { name: "Secure Passwords", slug: "password-generator", icon: "Shield", desc: "Generate secure cryptographic keys" },
    ]
  },
  {
    id: "media",
    label: "Media & Utilities",
    items: [
      { name: "Image Compressor", slug: "image-compressor", icon: "Image", desc: "Reduce file sizes without losing quality" },
      { name: "Image Converter", slug: "image-converter", icon: "RefreshCw", desc: "Convert between PNG, JPG, and WebP" },
      { name: "Universal Converter", slug: "unit-converter", icon: "Scale", desc: "Convert length, speed, and storage units" },
    ]
  },
  {
    id: "seo-calculators",
    label: "Calculators",
    items: [
      { name: "Interactive Calculators", slug: "calculators", icon: "Calculator", desc: "Financial, health, and standard calculators" },
      { name: "Word Counter & Text", slug: "word-counter", icon: "FileText", desc: "Count words, characters, and read times" },
    ]
  }
];

export const Navbar: React.FC<NavbarProps> = ({ onSelectTool, onGoHome, currentTool }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener: Command+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    if (q.trim().length > 1) {
      const filtered = CORE_TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(q.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(q.toLowerCase()) ||
          t.category.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectSearchResult = (slug: string) => {
    onSelectTool(slug);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <>
      <nav className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm px-5 py-3 flex items-center justify-between gap-4">
          
          {/* LEFT: Premium Brand Logo */}
          <div
            onClick={onGoHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            title="Go to Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:scale-102 transition-transform duration-250">
              <LucideIcon name="Sparkles" size={17} className="text-blue-500 animate-pulse" />
            </div>
            <div className="leading-none">
              <span className="text-sm font-extrabold tracking-tight text-slate-900 uppercase font-sans block">
                QRToolkit
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase block mt-0.5">
                Local Engine
              </span>
            </div>
          </div>

          {/* CENTER: Premium SaaS Dropdown Menus (Desktop only) */}
          <div className="hidden md:flex items-center gap-1">
            {DROPDOWN_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDropdown === category.id 
                      ? "bg-slate-50 text-slate-900" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                  }`}
                >
                  <span>{category.label}</span>
                  <LucideIcon 
                    name="ChevronDown" 
                    size={11} 
                    className={`transition-transform duration-250 text-slate-400 ${
                      activeDropdown === category.id ? "rotate-180 text-slate-900" : ""
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white border border-slate-200/85 rounded-2xl shadow-xl p-2.5 z-50"
                    >
                      <div className="space-y-0.5">
                        {category.items.map((item) => {
                          const isActive = currentTool?.slug === item.slug;
                          return (
                            <button
                              key={item.slug}
                              onClick={() => {
                                onSelectTool(item.slug);
                                setActiveDropdown(null);
                              }}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-colors text-left cursor-pointer group ${
                                isActive ? "bg-slate-50" : "hover:bg-slate-50/70"
                              }`}
                            >
                              <div className={`p-2 rounded-lg transition-all ${
                                isActive 
                                  ? "bg-slate-900 text-white" 
                                  : "bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white"
                              }`}>
                                <LucideIcon name={item.icon} size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className={`text-xs font-bold transition-colors ${
                                  isActive ? "text-slate-900" : "text-slate-800 group-hover:text-slate-900"
                                }`}>
                                  {item.name}
                                </h5>
                                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* RIGHT: Quick Search, CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input block (Desktop only) */}
            <div ref={searchContainerRef} className="hidden lg:block relative w-56 xl:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LucideIcon name="Search" size={14} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search tools..."
                className="w-full pl-9 pr-12 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-xs focus:outline-none focus:ring-1.5 focus:ring-slate-900 focus:bg-white transition-all font-medium"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200/80 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)] select-none">
                  ⌘K
                </kbd>
              </div>

              {/* Search Dropdown Overlay */}
              <AnimatePresence>
                {isSearchFocused && (searchQuery.trim().length > 1 || searchResults.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full mt-2 left-0 right-0 max-h-80 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5 space-y-0.5"
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((tool) => (
                        <div
                          key={tool.slug}
                          onClick={() => selectSearchResult(tool.slug)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors text-left group"
                        >
                          <div className="p-1.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            <LucideIcon name={tool.icon} size={12} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 truncate group-hover:text-slate-900">
                              {tool.name}
                            </h5>
                            <p className="text-[9px] text-slate-400 truncate mt-0.5">
                              {tool.shortDesc}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-slate-400 text-[11px]">
                        No tools matching "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary Action Button (Desktop only) */}
            <button
              onClick={() => onSelectTool("qr-code-generator")}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-slate-900/10 active:scale-98"
            >
              <span>Generate QR</span>
              <LucideIcon name="ArrowRight" size={12} className="text-slate-300" />
            </button>

            {/* Mobile Menu Toggle (Premium Morphing Button) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-slate-800">
                <motion.line
                  x1="2" y1="5" x2="16" y2="5"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0, 
                    y: isMenuOpen ? 4.5 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.line
                  x1="2" y1="9" x2="16" y2="9"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                  initial={{ opacity: 1 }}
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1 
                  }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                />
                <motion.line
                  x1="2" y1="13" x2="16" y2="13"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0, 
                    y: isMenuOpen ? -4.5 : 0 
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Slide-out Drawer Menu Container */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectTool={onSelectTool}
      />
    </>
  );
};

