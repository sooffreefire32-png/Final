import React, { useState, useEffect, useRef } from "react";
import { LucideIcon } from "../LucideIcon";

// Standard Code 128 Symbol encoding patterns (widths of the 4 bars and 4 spaces)
// We will implement a compact standard Code 128-B barcode generator!
const CODE128_B_PATTERNS: { [key: string]: string } = {
  " ": "212222", "!": "222122", "\"": "222221", "#": "121223", "$": "121322", "%": "131222", "&": "122213", "'": "122312", "(": "132212", ")": "221213",
  "*": "221312", "+": "231212", ",": "112232", "-": "122132", ".": "122231", "/": "113222", "0": "123122", "1": "123221", "2": "223211", "3": "221132",
  "4": "221231", "5": "213212", "6": "223112", "7": "312131", "8": "311222", "9": "321122", ":": "321221", ";": "312212", "<": "322112", "=": "322211",
  ">": "212123", "?": "212321", "@": "232121", "A": "111323", "B": "131123", "C": "131321", "D": "112313", "E": "132113", "F": "132311", "G": "211313",
  "H": "231113", "I": "231311", "J": "112133", "K": "112331", "L": "132131", "M": "113123", "N": "113321", "O": "133112", "P": "131231", "Q": "111332",
  "R": "131331", "S": "112332", "T": "132331", "U": "223311", "V": "211331", "W": "221133", "X": "213113", "Y": "213311", "Z": "213131", "[": "311123",
  "\\": "311321", "]": "313112", "^": "112232", "_": "112232", "`": "312113", "a": "312311", "b": "331112", "c": "311312", "d": "131132", "e": "113132",
  "f": "113231", "g": "311132", "h": "311231", "i": "311213", "j": "311312", "k": "113123", "l": "113213", "m": "311122", "n": "311221", "o": "312112",
  "p": "312211", "q": "311122", "r": "211133", "s": "231131", "t": "221114", "u": "211313", "v": "221114", "w": "411121", "x": "214111", "y": "221411",
  "z": "111224", "{": "111422", "|": "121124", "}": "121421", "~": "141122",
};

export const BarcodeGenerator: React.FC = () => {
  const [value, setValue] = useState<string>("QRTOOL-98125");
  const [barHeight, setBarHeight] = useState<number>(100);
  const [barWidth, setBarWidth] = useState<number>(2); // thickness of a single module
  const [showText, setShowText] = useState<boolean>(true);
  const [barcodeUrl, setBarcodeUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateBarcode();
  }, [value, barHeight, barWidth, showText]);

  const generateBarcode = () => {
    if (!value.trim()) {
      setBarcodeUrl("");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Validate if characters are within Code 128 subset B ASCII range (32 to 126)
    const validValue = value.split("").filter((char: string) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code <= 126;
    }).join("");

    if (!validValue) {
      setBarcodeUrl("");
      return;
    }

    // Start character for Subset B is Code 104
    const startCode = 104;
    let checksum = startCode;

    // Compile bar patterns
    // Start with Start B pattern: "211214"
    let encoding = "211214";

    // Add each character code
    for (let i = 0; i < validValue.length; i++) {
      const char = validValue[i];
      const charVal = char.charCodeAt(0) - 32;
      checksum += charVal * (i + 1);
      encoding += CODE128_B_PATTERNS[char] || "111111"; // Fallback safe pattern
    }

    // Add Checksum pattern
    const checksumVal = checksum % 103;
    const checksumChar = String.fromCharCode(checksumVal + 32);
    encoding += CODE128_B_PATTERNS[checksumChar] || "111111";

    // Add Stop Pattern: "2331112" (Stop character has an extra bar element of width 2)
    encoding += "2331112";

    // Calculate canvas size
    const quietZone = 30; // Left & Right padding
    const modulesCount = Array.from(encoding).reduce((sum, val) => sum + parseInt(val), 0);
    const width = modulesCount * barWidth + quietZone * 2;
    const textHeight = showText ? 24 : 0;
    const height = barHeight + textHeight + 30; // 30 is vertical padding

    canvas.width = width;
    canvas.height = height;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw bars
    let x = quietZone;
    ctx.fillStyle = "#000000";

    for (let i = 0; i < encoding.length; i++) {
      const moduleWidth = parseInt(encoding[i]) * barWidth;
      const isBar = i % 2 === 0; // Alternates bar, space, bar, space...

      if (isBar) {
        ctx.fillRect(x, 15, moduleWidth, barHeight);
      }
      x += moduleWidth;
    }

    // Draw text value if requested
    if (showText) {
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(validValue, width / 2, barHeight + 32);
    }

    setBarcodeUrl(canvas.toDataURL("image/png"));
  };

  const downloadBarcode = () => {
    if (!barcodeUrl) return;
    const link = document.createElement("a");
    link.download = `barcode-${value}.png`;
    link.href = barcodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Barcode Alphanumeric Value (Code 128)
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. SERIAL-987521"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-mono"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Code 128 supports letters, numbers, spaces, and punctuation.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Bar Settings
            </h4>

            <div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1.5">
                <span>Bar Height ({barHeight}px)</span>
              </div>
              <input
                type="range"
                min={60}
                max={200}
                value={barHeight}
                onChange={(e) => setBarHeight(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1.5">
                <span>Module Width ({barWidth}px)</span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                value={barWidth}
                onChange={(e) => setBarWidth(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                id="showText"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="showText" className="text-sm font-medium text-slate-700 dark:text-slate-300 select-none cursor-pointer">
                Display text value below barcode
              </label>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Generated Barcode
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-full overflow-x-auto flex items-center justify-center min-h-[160px]">
            <canvas ref={canvasRef} className="hidden" />
            {barcodeUrl ? (
              <img
                src={barcodeUrl}
                alt="Barcode Preview"
                className="max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xs text-slate-400 text-center max-w-[200px]">
                Please enter a valid alphanumeric value to draw barcode
              </span>
            )}
          </div>

          <button
            onClick={downloadBarcode}
            disabled={!barcodeUrl}
            className="w-full max-w-sm mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            <LucideIcon name="Download" size={18} /> Download Barcode PNG
          </button>
        </div>

      </div>
    </div>
  );
};
