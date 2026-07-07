import React, { useEffect, useRef } from "react";
import { LucideIcon } from "./LucideIcon";

// Component for Ad 1 (Square 300x250 iframe ad)
export const AdSquare: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Clear previous contents
    container.innerHTML = "";
    
    // Create iframe to isolate Adsterra scripts
    const iframe = document.createElement("iframe");
    iframe.width = "300";
    iframe.height = "250";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.background = "transparent";
    iframe.id = `ad-square-iframe-${Math.random().toString(36).substr(2, 9)}`;
    
    container.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '974dd57cfd0cc649be830c64439a0ace',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://manhoodinvoluntaryplash.com/974dd57cfd0cc649be830c64439a0ace/invoke.js"></script>
          </body>
        </html>
      `;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow shrink-0 w-[320px] h-[282px]">
      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
        <LucideIcon name="Tv" size={11} className="text-indigo-500" /> Sponsor Ad 1 (300x250)
      </span>
      <div ref={containerRef} className="w-[300px] h-[250px] overflow-hidden rounded-xl bg-white/20 dark:bg-slate-950/20" />
    </div>
  );
};

// Component for Ad 2 (Social Bar/Banner container ad)
export const AdBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Clear previous contents
    container.innerHTML = "";
    
    // Create iframe to isolate Adsterra scripts
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.minHeight = "250px";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.background = "transparent";
    iframe.id = `ad-banner-iframe-${Math.random().toString(36).substr(2, 9)}`;
    
    container.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <div id="container-83f9b318db3fa736212ae8a0df2f7325" style="width: 100%; height: 100%; min-height: 250px; display: flex; justify-content: center; align-items: center;"></div>
            <script async="async" data-cfasync="false" src="https://manhoodinvoluntaryplash.com/83f9b318db3fa736212ae8a0df2f7325/invoke.js"></script>
          </body>
        </html>
      `;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full min-h-[282px]">
      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5 self-start ml-2">
        <LucideIcon name="Sparkles" size={11} className="text-emerald-500" /> Sponsor Ad 2 (Responsive Widget)
      </span>
      <div ref={containerRef} className="w-full h-full min-h-[250px] overflow-hidden rounded-xl bg-white/20 dark:bg-slate-950/20" />
    </div>
  );
};

interface AdsPlaceholderProps {
  type?: "leaderboard" | "square" | "native";
  className?: string;
}

export const AdsPlaceholder: React.FC<AdsPlaceholderProps> = ({ className = "" }) => {
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      {/* Outer elegant frame containing BOTH Ads */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch justify-center">
        
        {/* Ad 1 (Square) */}
        <div className="md:col-span-5 lg:col-span-4 flex justify-center">
          <AdSquare />
        </div>

        {/* Ad 2 (Banner) */}
        <div className="md:col-span-7 lg:col-span-8 flex justify-center w-full">
          <AdBanner />
        </div>

      </div>
    </div>
  );
};
