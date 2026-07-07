import React, { useState, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

interface Unit {
  name: string;
  label: string;
  ratio: number; // Ratio to base unit
}

interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  baseUnit: string;
  units: Unit[];
}

const CATEGORIES: UnitCategory[] = [
  {
    id: "length",
    name: "Length",
    icon: "Ruler",
    baseUnit: "m",
    units: [
      { name: "mm", label: "Millimeters (mm)", ratio: 0.001 },
      { name: "cm", label: "Centimeters (cm)", ratio: 0.01 },
      { name: "m", label: "Meters (m)", ratio: 1 },
      { name: "km", label: "Kilometers (km)", ratio: 1000 },
      { name: "in", label: "Inches (in)", ratio: 0.0254 },
      { name: "ft", label: "Feet (ft)", ratio: 0.3048 },
      { name: "yd", label: "Yards (yd)", ratio: 0.9144 },
      { name: "mi", label: "Miles (mi)", ratio: 1609.344 }
    ]
  },
  {
    id: "weight",
    name: "Weight",
    icon: "Scale",
    baseUnit: "kg",
    units: [
      { name: "mg", label: "Milligrams (mg)", ratio: 0.000001 },
      { name: "g", label: "Grams (g)", ratio: 0.001 },
      { name: "kg", label: "Kilograms (kg)", ratio: 1 },
      { name: "oz", label: "Ounces (oz)", ratio: 0.0283495 },
      { name: "lb", label: "Pounds (lb)", ratio: 0.453592 },
      { name: "ton", label: "Metric Tons (t)", ratio: 1000 }
    ]
  },
  {
    id: "storage",
    name: "Data Storage",
    icon: "HardDrive",
    baseUnit: "B",
    units: [
      { name: "B", label: "Bytes (B)", ratio: 1 },
      { name: "KB", label: "Kilobytes (KB)", ratio: 1024 },
      { name: "MB", label: "Megabytes (MB)", ratio: 1024 * 1024 },
      { name: "GB", label: "Gigabytes (GB)", ratio: 1024 * 1024 * 1024 },
      { name: "TB", label: "Terabytes (TB)", ratio: 1024 * 1024 * 1024 * 1024 }
    ]
  },
  {
    id: "speed",
    name: "Speed",
    icon: "Activity",
    baseUnit: "m/s",
    units: [
      { name: "m/s", label: "Meters / Second (m/s)", ratio: 1 },
      { name: "km/h", label: "Kilometers / Hour (km/h)", ratio: 0.277778 },
      { name: "mph", label: "Miles / Hour (mph)", ratio: 0.44704 },
      { name: "knot", label: "Knots (kt)", ratio: 0.514444 }
    ]
  },
  {
    id: "area",
    name: "Area",
    icon: "Grid",
    baseUnit: "m2",
    units: [
      { name: "cm2", label: "Square Centimeters (cm²)", ratio: 0.0001 },
      { name: "m2", label: "Square Meters (m²)", ratio: 1 },
      { name: "km2", label: "Square Kilometers (km²)", ratio: 1000000 },
      { name: "sq_in", label: "Square Inches (in²)", ratio: 0.00064516 },
      { name: "sq_ft", label: "Square Feet (ft²)", ratio: 0.092903 },
      { name: "acre", label: "Acres (ac)", ratio: 4046.856 },
      { name: "hectare", label: "Hectares (ha)", ratio: 10000 }
    ]
  }
];

export const UnitConverter: React.FC = () => {
  const [activeCatId, setActiveCatId] = useState<string>("length");
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputUnitName, setInputUnitName] = useState<string>("m");
  const [conversions, setConversions] = useState<{ name: string; label: string; value: string }[]>([]);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[0];

  useEffect(() => {
    // Sync default unit when category swaps
    setInputUnitName(activeCategory.units[0].name);
  }, [activeCatId]);

  useEffect(() => {
    calculateConversions();
  }, [inputValue, inputUnitName, activeCatId]);

  const calculateConversions = () => {
    if (activeCatId === "temp") {
      // Temperature handles special non-ratio linear formulas
      const val = inputValue;
      let celsius = val;
      if (inputUnitName === "f") celsius = ((val - 32) * 5) / 9;
      if (inputUnitName === "k") celsius = val - 273.15;

      const results = [
        { name: "c", label: "Celsius (°C)", value: celsius.toFixed(2) },
        { name: "f", label: "Fahrenheit (°F)", value: ((celsius * 9) / 5 + 32).toFixed(2) },
        { name: "k", label: "Kelvin (K)", value: (celsius + 273.15).toFixed(2) }
      ];
      setConversions(results);
      return;
    }

    const currentUnit = activeCategory.units.find((u) => u.name === inputUnitName);
    if (!currentUnit) return;

    // Convert input value to standard base unit value
    const baseValue = inputValue * currentUnit.ratio;

    // Convert from base unit value to alternative matching units
    const results = activeCategory.units.map((u) => {
      const converted = baseValue / u.ratio;
      // Format with reasonable precision to prevent floating point noise
      let valueStr = "";
      if (converted === 0) {
        valueStr = "0";
      } else if (Math.abs(converted) < 0.0001) {
        valueStr = converted.toExponential(4);
      } else if (converted % 1 === 0) {
        valueStr = converted.toLocaleString();
      } else {
        valueStr = converted.toLocaleString(undefined, { maximumFractionDigits: 5 });
      }

      return {
        name: u.name,
        label: u.label,
        value: valueStr
      };
    });

    setConversions(results);
  };

  const copyToClipboard = (val: string) => {
    // Strip commas for safe pasting
    const clean = val.replace(/,/g, "");
    navigator.clipboard.writeText(clean);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category List Column */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60 lg:pr-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCatId(cat.id)}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
                activeCatId === cat.id
                  ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md"
                  : "hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <LucideIcon name={cat.icon} size={16} />
              <span>{cat.name}</span>
            </button>
          ))}
          {/* Add Temperature manually as it has custom math */}
          <button
            onClick={() => setActiveCatId("temp")}
            className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
              activeCatId === "temp"
                ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md"
                : "hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400"
            }`}
          >
            <LucideIcon name="Thermometer" size={16} />
            <span>Temperature</span>
          </button>
        </div>

        {/* Workspace Column */}
        <div className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-8">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Enter Input Quantity Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Source Unit
              </label>
              <select
                value={inputUnitName}
                onChange={(e) => setInputUnitName(e.target.value)}
                className="w-full px-3 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {activeCatId === "temp" ? (
                  <>
                    <option value="c">Celsius (°C)</option>
                    <option value="f">Fahrenheit (°F)</option>
                    <option value="k">Kelvin (K)</option>
                  </>
                ) : (
                  activeCategory.units.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.label}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Calculated Equivalent Conversions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conversions.map((conv) => (
                <div
                  key={conv.name}
                  className="p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950/40 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-400 font-semibold">{conv.label}</span>
                    <p className="text-base font-bold font-mono text-slate-800 dark:text-slate-100 break-all select-all">
                      {conv.value}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(conv.value)}
                    title="Copy conversion value"
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
                  >
                    <LucideIcon name="Copy" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
