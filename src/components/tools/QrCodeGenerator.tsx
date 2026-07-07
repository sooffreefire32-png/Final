import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { LucideIcon } from "../LucideIcon";

export const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>("https://qrtoolkit.site");
  const [colorDark, setColorDark] = useState<string>("#0f172a");
  const [colorLight, setColorLight] = useState<string>("#ffffff");
  const [size, setSize] = useState<number>(512);
  const [margin, setMargin] = useState<number>(4);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("H");
  const [qrUrl, setQrUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQr();
  }, [text, colorDark, colorLight, size, margin, errorCorrection]);

  const generateQr = async () => {
    if (!text.trim()) {
      setQrUrl("");
      return;
    }
    try {
      const options: QRCode.QRCodeRenderersOptions = {
        width: size,
        margin: margin,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      };

      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, options);
        const url = canvasRef.current.toDataURL("image/png");
        setQrUrl(url);
      }
    } catch (err) {
      console.error("QR Code Generation failed", err);
    }
  };

  const downloadQr = (format: "png" | "jpg") => {
    if (!qrUrl) return;
    
    // Create download link
    const link = document.createElement("a");
    link.download = `qrtoolkit-qrcode.${format}`;
    
    if (format === "png") {
      link.href = qrUrl;
    } else {
      // For JPG, convert canvas to image/jpeg
      if (canvasRef.current) {
        link.href = canvasRef.current.toDataURL("image/jpeg", 0.9);
      } else {
        link.href = qrUrl;
      }
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setPresetType = (type: string) => {
    if (type === "whatsapp") {
      setText("https://wa.me/1234567890?text=Hello%20there!");
    } else if (type === "wifi") {
      setText("WIFI:S:MyHomeWiFi;T:WPA;P:SecretPassword123;;");
    } else if (type === "vcard") {
      setText("BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nORG:QRToolkit\nTEL:1234567890\nEMAIL:john@example.com\nEND:VCARD");
    } else {
      setText("https://qrtoolkit.site");
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
              1. Quick Content Presets
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setPresetType("url")}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <LucideIcon name="Link" size={16} /> URL
              </button>
              <button
                onClick={() => setPresetType("whatsapp")}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <LucideIcon name="MessageSquare" size={16} /> WhatsApp
              </button>
              <button
                onClick={() => setPresetType("wifi")}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <LucideIcon name="Wifi" size={16} /> WiFi
              </button>
              <button
                onClick={() => setPresetType("vcard")}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <LucideIcon name="User" size={16} /> Contact
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Enter QR Code Text / URL Data
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter link, text, phone, or WiFi configuration details..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Primary Dark Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorDark}
                  onChange={(e) => setColorDark(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={colorDark}
                  onChange={(e) => setColorDark(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Background Light Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorLight}
                  onChange={(e) => setColorLight(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={colorLight}
                  onChange={(e) => setColorLight(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Resolution Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none"
              >
                <option value={256}>Standard (256x256)</option>
                <option value={512}>High-Res (512x512)</option>
                <option value={1024}>Ultra (1024x1024)</option>
                <option value={2048}>Print HD (2048x2048)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Margin Border
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none"
              >
                <option value={0}>No Margin</option>
                <option value={2}>Narrow (2px)</option>
                <option value={4}>Medium (4px)</option>
                <option value={8}>Wide (8px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Error Correction
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none"
              >
                <option value="L">Low (~7% recovery)</option>
                <option value="M">Medium (~15% recovery)</option>
                <option value="Q">Quartile (~25% recovery)</option>
                <option value="H">High (~30% recovery)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Live Preview
            </span>
          </div>

          <div className="relative p-4 bg-white rounded-2xl shadow-md border border-slate-100 dark:border-slate-800/20 max-w-[280px]">
            {/* Hidden canvas used to compile QR */}
            <canvas ref={canvasRef} className="hidden" />
            
            {qrUrl ? (
              <img
                src={qrUrl}
                alt="QR Code Preview"
                className="w-full h-auto aspect-square rounded-lg object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-400 text-xs text-center p-4">
                  Please enter content to generate QR Code
                </span>
              </div>
            )}
          </div>

          <div className="w-full mt-6 space-y-2">
            <button
              onClick={() => downloadQr("png")}
              disabled={!qrUrl}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <LucideIcon name="Download" size={18} /> Download High-Res PNG
            </button>
            
            <button
              onClick={() => downloadQr("jpg")}
              disabled={!qrUrl}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
            >
              Download JPG Format
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
