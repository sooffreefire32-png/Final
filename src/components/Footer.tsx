import React from "react";
import { LucideIcon } from "./LucideIcon";

interface FooterProps {
  onSelectTool: (slug: string) => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onGoHome }) => {
  const currentYear = new Date().getFullYear();

  const categories = [
    {
      title: "QR & Identifiers",
      items: [
        { name: "QR Code Generator", slug: "qr-code-generator" },
        { name: "Webcam QR Scanner", slug: "qr-code-scanner" },
        { name: "Code 128 Barcode Maker", slug: "barcode-generator" }
      ]
    },
    {
      title: "File & Quality Optimizer",
      items: [
        { name: "Canvas Image Compressor", slug: "image-compressor" },
        { name: "High-Speed PNG to WebP", slug: "image-converter" },
        { name: "Responsive JPG/PNG Convert", slug: "image-converter" }
      ]
    },
    {
      title: "Security & Encryption",
      items: [
        { name: "Secure Pass Generator", slug: "password-generator" },
        { name: "Entropy Score Analyzer", slug: "password-generator" }
      ]
    },
    {
      title: "Text & Converters",
      items: [
        { name: "Universal Unit Converter", slug: "unit-converter" },
        { name: "Interactive Calculators", slug: "calculators" },
        { name: "Word Counter & Text Analyzer", slug: "word-counter" }
      ]
    }
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 md:p-12 w-full">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Upper Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div
              onClick={onGoHome}
              className="flex items-center gap-2 cursor-pointer group select-none w-max"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10">
                <LucideIcon name="Sparkles" size={16} />
              </div>
              <span className="text-base font-black tracking-tight text-slate-800 dark:text-slate-100 uppercase">
                QRToolkit
              </span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Browser-based utilities for creators and developers. All tools run completely on the client side, ensuring that your keys, files, and generated assets remain fully confidential.
            </p>

            <div className="flex gap-2.5">
              {["Github", "Twitter", "Linkedin"].map((social) => (
                <button
                  key={social}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <LucideIcon name={social === "Linkedin" ? "Linkedin" : social === "Twitter" ? "Twitter" : "Github"} size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links categories grids */}
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-3.5">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                {cat.title}
              </h5>
              <ul className="space-y-2 text-xs">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <button
                      onClick={() => onSelectTool(item.slug)}
                      className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <hr className="border-slate-200/50 dark:border-slate-800/40" />

        {/* Lower row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div>
            © {currentYear} QRToolkit. Built with privacy in mind. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Dynamic Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
