import React, { useState, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

export const DeveloperTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"json" | "base64" | "url" | "hash" | "text">("json");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  
  // JSON specific
  const [jsonIndent, setJsonIndent] = useState<number>(2);

  // Base64 & URL specific mode
  const [isDecode, setIsDecode] = useState<boolean>(false);

  // Hash specific algorithm
  const [hashAlgo, setHashAlgo] = useState<"SHA-256" | "SHA-1">("SHA-256");

  useEffect(() => {
    runToolLogic();
  }, [inputText, activeTab, jsonIndent, isDecode, hashAlgo]);

  const runToolLogic = async () => {
    setErrorMsg("");
    setOutputText("");

    if (!inputText.trim()) {
      return;
    }

    try {
      if (activeTab === "json") {
        try {
          const parsed = JSON.parse(inputText);
          setOutputText(JSON.stringify(parsed, null, jsonIndent));
        } catch (e: any) {
          setErrorMsg(`Invalid JSON: ${e.message}`);
          setOutputText("");
        }
      } 
      else if (activeTab === "base64") {
        if (isDecode) {
          try {
            setOutputText(atob(inputText));
          } catch (e) {
            setErrorMsg("Failed to decode Base64: String contains invalid characters or has incorrect length padding.");
          }
        } else {
          setOutputText(btoa(inputText));
        }
      } 
      else if (activeTab === "url") {
        if (isDecode) {
          try {
            setOutputText(decodeURIComponent(inputText));
          } catch (e) {
            setErrorMsg("Failed to decode URL encoding. Invalid character sequence.");
          }
        } else {
          setOutputText(encodeURIComponent(inputText));
        }
      } 
      else if (activeTab === "hash") {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(inputText);
          const hashBuffer = await crypto.subtle.digest(hashAlgo, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
          setOutputText(hashHex);
        } catch (e) {
          setErrorMsg("Cryptography calculation failed on this device.");
        }
      }
    } catch (err: any) {
      setErrorMsg(`Operation failed: ${err.message}`);
    }
  };

  const copyResult = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
  };

  const setSampleData = () => {
    if (activeTab === "json") {
      setInputText('{"site":"qrtoolkit.site","services":["QR","SEO","Developer","Converter"],"active":true,"queries_per_day":250000}');
    } else if (activeTab === "base64") {
      setInputText(isDecode ? "UXJUb29sa2l0IGlzIGF3ZXNvbWUh" : "QRToolkit is awesome!");
    } else if (activeTab === "url") {
      setInputText(isDecode ? "https%3A%2F%2Fqrtoolkit.site%2Fimage-compressor%3Fkb%3D100" : "https://qrtoolkit.site/image-compressor?kb=100");
    } else if (activeTab === "hash") {
      setInputText("admin12345");
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60 lg:pr-6 shrink-0">
          {[
            { id: "json", label: "JSON Formatter", icon: "Code" },
            { id: "base64", label: "Base64 Codec", icon: "Database" },
            { id: "url", label: "URL Encoder", icon: "Globe" },
            { id: "hash", label: "Crypto Hash", icon: "Key" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setInputText("");
                setOutputText("");
                setErrorMsg("");
              }}
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {activeTab === "json" && "Pretty-Print JSON Formatter"}
              {activeTab === "base64" && "Base64 Encoder & Decoder"}
              {activeTab === "url" && "URL percent encoder / decoder"}
              {activeTab === "hash" && "Native Cryptographic Hashes"}
            </h4>

            <div className="flex gap-2">
              <button
                onClick={setSampleData}
                className="py-1.5 px-3 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-500 transition-colors cursor-pointer"
              >
                Insert Sample Data
              </button>

              {activeTab === "json" && (
                <select
                  value={jsonIndent}
                  onChange={(e) => setJsonIndent(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                >
                  <option value={2}>2 Space Indent</option>
                  <option value={4}>4 Space Indent</option>
                </select>
              )}

              {(activeTab === "base64" || activeTab === "url") && (
                <div className="flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950 text-xs font-semibold">
                  <button
                    onClick={() => setIsDecode(false)}
                    className={`py-1 px-2.5 rounded-md transition-colors ${
                      !isDecode
                        ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setIsDecode(true)}
                    className={`py-1 px-2.5 rounded-md transition-colors ${
                      isDecode
                        ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    Decode
                  </button>
                </div>
              )}

              {activeTab === "hash" && (
                <select
                  value={hashAlgo}
                  onChange={(e) => setHashAlgo(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  <option value="SHA-256">SHA-256 Hash</option>
                  <option value="SHA-1">SHA-1 Hash</option>
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input panel */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Raw Input
              </span>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeTab === "json"
                    ? 'Paste ugly JSON here (e.g. {"name":"QRToolkit","type":"SEO"})'
                    : activeTab === "base64"
                    ? isDecode
                      ? "Paste Base64 code string here..."
                      : "Type or paste string text here to encode..."
                    : activeTab === "url"
                    ? isDecode
                      ? "Paste percent encoded URL parameters here..."
                      : "Paste URL or text params to encode here..."
                    : "Enter any plain text string to compute its hash value..."
                }
                rows={10}
                className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 font-mono text-sm resize-none"
              />
            </div>

            {/* Output panel */}
            <div className="space-y-2 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Formatted Output
                </span>
                {outputText && (
                  <button
                    onClick={copyResult}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <LucideIcon name="Copy" size={12} /> Copy Output
                  </button>
                )}
              </div>

              <div className="relative flex-1 min-h-[224px]">
                {errorMsg ? (
                  <div className="absolute inset-0 p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-mono whitespace-pre-wrap overflow-y-auto">
                    {errorMsg}
                  </div>
                ) : (
                  <textarea
                    readOnly
                    value={outputText}
                    placeholder="Output code or processed string results will be drawn here..."
                    rows={10}
                    className="w-full h-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 rounded-2xl font-mono text-sm resize-none focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
