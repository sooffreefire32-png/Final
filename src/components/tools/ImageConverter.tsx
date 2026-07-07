import React, { useState, useRef, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

export const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<"png" | "jpeg" | "webp">("webp");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      processConversion();
    }
  }, [file, targetFormat, width, height]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      loadOriginal(selected);
    }
  };

  const loadOriginal = (selected: File) => {
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio) {
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio) {
      setWidth(Math.round(val * aspectRatio));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadOriginal(e.dataTransfer.files[0]);
    }
  };

  const processConversion = () => {
    if (!file || !originalUrl || width === 0 || height === 0) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Handle transparent backgrounds for JPEGs
      if (targetFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = `image/${targetFormat}`;
      const url = canvas.toDataURL(mimeType, targetFormat === "jpeg" ? 0.92 : undefined);
      setConvertedUrl(url);
      setIsProcessing(false);
    };
    img.src = originalUrl;
  };

  const downloadFile = () => {
    if (!convertedUrl || !file) return;
    const originalName = file.name.substring(0, file.name.lastIndexOf("."));
    const link = document.createElement("a");
    link.download = `${originalName}-converted.${targetFormat === "jpeg" ? "jpg" : targetFormat}`;
    link.href = convertedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setPresetRoute = (from: string, to: "png" | "jpeg" | "webp") => {
    setTargetFormat(to);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
              Quick Conversion Presets
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPresetRoute("png", "webp")}
                className="py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors"
              >
                PNG to WebP
              </button>
              <button
                onClick={() => setPresetRoute("jpg", "png")}
                className="py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors"
              >
                JPG to PNG
              </button>
              <button
                onClick={() => setPresetRoute("webp", "jpeg")}
                className="py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors"
              >
                WebP to JPG
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Step 1: Upload Image to Convert
            </label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
                dragActive ? "bg-blue-500/10 border-blue-500" : "border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <LucideIcon name="Image" className="text-slate-400 dark:text-slate-500 mb-2" size={24} />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Choose Image File
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                PNG, JPG, WebP, GIF, BMP, etc.
              </p>
            </div>
          </div>

          {file && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Step 2: Select Target Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["png", "jpeg", "webp"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setTargetFormat(fmt as any)}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-colors cursor-pointer capitalize ${
                        targetFormat === fmt
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {fmt === "jpeg" ? "JPG" : fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Step 3: Resize Dimensions (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="lockRatio"
                      checked={lockRatio}
                      onChange={(e) => setLockRatio(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600"
                    />
                    <label htmlFor="lockRatio" className="text-xs text-slate-500 cursor-pointer">
                      Lock Aspect Ratio
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Width (pixels)</span>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Height (pixels)</span>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          {file ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Conversion Live Status
                </span>
              </div>

              <div className="aspect-video bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative flex items-center justify-center">
                {isProcessing ? (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <LucideIcon name="Loader" className="animate-spin mb-2" size={24} />
                    <span className="text-xs">Converting...</span>
                  </div>
                ) : convertedUrl ? (
                  <img
                    src={convertedUrl}
                    alt="Converted Output"
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 text-xs text-blue-700 dark:text-blue-400 flex items-start gap-2.5 leading-relaxed">
                <LucideIcon name="Info" className="shrink-0 mt-0.5" size={15} />
                <div>
                  <span className="font-semibold">Local Conversion Security:</span> Your images are parsed and exported entirely in JavaScript using client-side elements. Your files never touch a cloud server.
                </div>
              </div>

              <button
                onClick={downloadFile}
                disabled={isProcessing || !convertedUrl}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer"
              >
                <LucideIcon name="Download" size={18} /> Download Converted File
              </button>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <LucideIcon name="ImagePlay" className="text-slate-300 dark:text-slate-700 mb-2" size={48} />
              <p className="text-slate-500 text-sm font-medium">
                Conversion Hub Idle
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                Select preset options or upload a custom image file in step 1 to configure your local browser converter.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
