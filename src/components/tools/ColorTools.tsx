import React, { useState, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

interface PaletteColor {
  hex: string;
  locked: boolean;
}

export const ColorTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"palette" | "converter" | "contrast">("palette");

  // Palette Generator state
  const [palette, setPalette] = useState<PaletteColor[]>([
    { hex: "#3b82f6", locked: false },
    { hex: "#10b981", locked: false },
    { hex: "#f59e0b", locked: false },
    { hex: "#ef4444", locked: false },
    { hex: "#6366f1", locked: false }
  ]);

  // Format Converter State
  const [hexVal, setHexVal] = useState<string>("#3b82f6");
  const [rgbVal, setRgbVal] = useState<string>("rgb(59, 130, 246)");
  const [hslVal, setHslVal] = useState<string>("hsl(217, 91%, 60%)");

  // Contrast Checker State
  const [fgColor, setFgColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#0f172a");
  const [contrastRatio, setContrastRatio] = useState<number>(1);

  useEffect(() => {
    if (activeTab === "palette") {
      // Roll a default palette if empty
    }
  }, [activeTab]);

  useEffect(() => {
    calculateContrast();
  }, [fgColor, bgColor]);

  // Generates random color code
  const randomHex = () => {
    const letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const rollPalette = () => {
    setPalette(
      palette.map((color) => {
        if (color.locked) return color;
        return { hex: randomHex(), locked: false };
      })
    );
  };

  const toggleLockColor = (index: number) => {
    setPalette(
      palette.map((color, idx) => {
        if (idx === index) {
          return { ...color, locked: !color.locked };
        }
        return color;
      })
    );
  };

  const copyHexToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  // Convert Hex to RGB and HSL
  const handleHexConvert = (hex: string) => {
    setHexVal(hex);
    
    // Simple parsing
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6) return;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) return;

    setRgbVal(`rgb(${r}, ${g}, ${b})`);

    // RGB to HSL conversion
    const rScaled = r / 255;
    const gScaled = g / 255;
    const bScaled = b / 255;

    const max = Math.max(rScaled, gScaled, bScaled);
    const min = Math.min(rScaled, gScaled, bScaled);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rScaled:
          h = (gScaled - bScaled) / d + (gScaled < bScaled ? 6 : 0);
          break;
        case gScaled:
          h = (bScaled - rScaled) / d + 2;
          break;
        case bScaled:
          h = (rScaled - gScaled) / d + 4;
          break;
      }
      h /= 6;
    }

    setHslVal(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
  };

  // Calculate Relative Luminance and Contrast Ratio matching WCAG specifications
  const getLuminance = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6) return 0;

    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = () => {
    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    const ratio = (lighter + 0.05) / (darker + 0.05);
    setContrastRatio(Math.round(ratio * 100) / 100);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60 lg:pr-6 shrink-0">
          {[
            { id: "palette", label: "Palette Generator", icon: "Palette" },
            { id: "converter", label: "Format Translator", icon: "RefreshCw" },
            { id: "contrast", label: "WCAG Contrast Checker", icon: "Eye" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
                activeTab === tab.id
                  ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md"
                  : "hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <LucideIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Workspace Panels */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Palette Generator Panel */}
          {activeTab === "palette" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Press Generate to randomize unlocked colors. Click lock to pin favorite shades.
                </p>
                <button
                  onClick={rollPalette}
                  className="py-2 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/10 cursor-pointer shrink-0"
                >
                  Generate New Palette
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-64">
                {palette.map((color, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden relative border border-slate-100 dark:border-slate-800/30 flex flex-col justify-end p-4 text-white group shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Contrast background card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-slate-950/20 group-hover:via-slate-950/10 transition-colors" />

                    <div className="relative space-y-2 z-10 flex flex-row sm:flex-col justify-between items-center sm:items-start w-full">
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Color {idx+1}</span>
                        <p className="font-mono text-sm font-bold uppercase">{color.hex}</p>
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          onClick={() => toggleLockColor(idx)}
                          title={color.locked ? "Unlock Color" : "Lock Color"}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors cursor-pointer"
                        >
                          <LucideIcon name={color.locked ? "Lock" : "Unlock"} size={13} />
                        </button>
                        <button
                          onClick={() => copyHexToClipboard(color.hex)}
                          title="Copy Hex Code"
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors cursor-pointer"
                        >
                          <LucideIcon name="Copy" size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Color format translator Panel */}
          {activeTab === "converter" && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={hexVal}
                  onChange={(e) => handleHexConvert(e.target.value)}
                  className="w-16 h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent cursor-pointer shrink-0"
                />
                <div className="space-y-1 w-full">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Interact spectrum to convert
                  </label>
                  <input
                    type="text"
                    value={hexVal}
                    onChange={(e) => handleHexConvert(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-mono bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800/60" />

              <div className="space-y-3">
                {[
                  { label: "HEX Code", value: hexVal },
                  { label: "RGB Value", value: rgbVal },
                  { label: "HSL Value", value: hslVal }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl border border-slate-200/50 bg-slate-50/50 dark:bg-slate-950/40 flex justify-between items-center"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</span>
                      <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{item.value}</p>
                    </div>

                    <button
                      onClick={() => navigator.clipboard.writeText(item.value)}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      <LucideIcon name="Copy" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WCAG Contrast Checker Panel */}
          {activeTab === "contrast" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Foreground Text Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div
                  className="p-6 rounded-2xl border text-center transition-all h-36 flex flex-col items-center justify-center border-slate-200"
                  style={{ color: fgColor, backgroundColor: bgColor }}
                >
                  <p className="text-lg font-bold">This is Sample Large Heading Text</p>
                  <p className="text-xs mt-1.5 opacity-80">This is sample body text to test contrast clarity ratios.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Ratio Score</span>
                    <span className="text-lg font-mono font-extrabold text-slate-800 dark:text-slate-100">{contrastRatio} : 1</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border text-center flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Normal text (WCAG)</span>
                    <span className={`text-xs font-bold uppercase mt-1 ${contrastRatio >= 4.5 ? "text-emerald-500" : "text-red-500"}`}>
                      {contrastRatio >= 4.5 ? "PASS (AA)" : "FAIL"}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border text-center flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Large Text (WCAG)</span>
                    <span className={`text-xs font-bold uppercase mt-1 ${contrastRatio >= 3.0 ? "text-emerald-500" : "text-red-500"}`}>
                      {contrastRatio >= 3.0 ? "PASS (AA)" : "FAIL"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
