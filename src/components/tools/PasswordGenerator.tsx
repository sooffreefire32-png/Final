import React, { useState, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useDigits, setUseDigits] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useDigits, useSymbols]);

  const generatePassword = () => {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let allowed = "";
    if (useUpper) allowed += upperChars;
    if (useLower) allowed += lowerChars;
    if (useDigits) allowed += digitChars;
    if (useSymbols) allowed += symbolChars;

    if (!allowed) {
      setPassword("");
      return;
    }

    // Use cryptographically secure browser random values (window.crypto)
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += allowed[array[i] % allowed.length];
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    if (!password) return { label: "Empty", score: 0, color: "bg-slate-200 dark:bg-slate-800", text: "text-slate-400" };
    
    let varieties = 0;
    if (useUpper) varieties += 26;
    if (useLower) varieties += 26;
    if (useDigits) varieties += 10;
    if (useSymbols) varieties += 26;

    // Calculate entropy: E = L * log2(R)
    const entropy = Math.round(length * (Math.log(varieties || 2) / Math.log(2)));

    if (entropy < 40) {
      return { label: "Weak", score: 25, color: "bg-red-500", text: "text-red-500", desc: "Vulnerable to basic automated credential stuffing." };
    } else if (entropy < 65) {
      return { label: "Medium", score: 50, color: "bg-amber-500", text: "text-amber-500", desc: "Decent baseline protection, but longer strings provide more safety." };
    } else if (entropy < 90) {
      return { label: "Strong", score: 75, color: "bg-emerald-500", text: "text-emerald-500", desc: "Highly secure. Recommended for main credentials." };
    } else {
      return { label: "Excellent", score: 100, color: "bg-blue-600", text: "text-blue-600 font-bold", desc: "Exceeds standard enterprise cryptographic recommendations." };
    }
  };

  const strength = calculateStrength();

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Output Screen */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="font-mono text-base md:text-xl font-semibold text-slate-800 dark:text-slate-200 break-all select-all">
            {password || <span className="text-slate-400">Please select at least 1 option</span>}
          </div>
          
          <div className="flex gap-2 shrink-0">
            <button
              onClick={generatePassword}
              title="Regenerate random string"
              className="p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-500 transition-colors cursor-pointer"
            >
              <LucideIcon name="RefreshCw" size={18} />
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className={`p-3 rounded-xl font-medium transition-all cursor-pointer flex items-center justify-center min-w-12 ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/15"
              }`}
            >
              {copied ? <LucideIcon name="Check" size={18} /> : <LucideIcon name="Copy" size={18} />}
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Entropy Strength Indicator</span>
            <span className={strength.text}>{strength.label}</span>
          </div>
          
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${strength.color}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
          
          {password && (
            <p className="text-xs text-slate-500 leading-relaxed italic">
              {strength.desc}
            </p>
          )}
        </div>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Parameter Customizers */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
              <span>Password Character Length ({length})</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{length} symbols</span>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Short (6)</span>
              <span>Secure standard (16)</span>
              <span>Overkill (64)</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">
              Character Inclusions
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setUseUpper(!useUpper)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                  useUpper
                    ? "border-blue-500 bg-blue-500/5 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 px-1.5 rounded-lg">A-Z</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Uppercase letters</span>
                </div>
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={() => {}} // Handled by div click
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                />
              </div>

              <div
                onClick={() => setUseLower(!useLower)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                  useLower
                    ? "border-blue-500 bg-blue-500/5 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 px-1.5 rounded-lg">a-z</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Lowercase letters</span>
                </div>
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                />
              </div>

              <div
                onClick={() => setUseDigits(!useDigits)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                  useDigits
                    ? "border-blue-500 bg-blue-500/5 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 px-1.5 rounded-lg">0-9</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Numeric digits</span>
                </div>
                <input
                  type="checkbox"
                  checked={useDigits}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                />
              </div>

              <div
                onClick={() => setUseSymbols(!useSymbols)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
                  useSymbols
                    ? "border-blue-500 bg-blue-500/5 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 px-1.5 rounded-lg">#&!</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Special symbols</span>
                </div>
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
