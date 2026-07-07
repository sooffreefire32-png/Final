import React, { useState, useRef, useEffect } from "react";
import { LucideIcon } from "../LucideIcon";

export const ImageCompressor: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.8);
  const [targetSizeKb, setTargetSizeKb] = useState<number | null>(null); // e.g. 100, 50, 20 KB
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [compressedUrl, setCompressedUrl] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (originalFile) {
      compressImage();
    }
  }, [quality, targetSizeKb, originalFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadOriginal(file);
    }
  };

  const loadOriginal = (file: File) => {
    setOriginalFile(file);
    setOriginalSize(file.size);
    setOriginalUrl(URL.createObjectURL(file));
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

  const compressImage = async () => {
    if (!originalFile || !originalUrl) return;
    setIsCompressing(true);

    const img = new Image();
    img.src = originalUrl;

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Keep original dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Determine compression parameters
      let finalBlob: Blob | null = null;
      
      if (targetSizeKb !== null) {
        // Run interactive loop search for appropriate quality parameter to achieve target size
        const targetBytes = targetSizeKb * 1024;
        let qMin = 0.05;
        let qMax = 0.95;
        let bestBlob: Blob | null = null;

        for (let iteration = 0; iteration < 7; iteration++) {
          const testQ = (qMin + qMax) / 2;
          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/jpeg", testQ);
          });
          
          if (blob) {
            if (blob.size <= targetBytes) {
              bestBlob = blob;
              qMin = testQ; // try higher quality
            } else {
              qMax = testQ; // try stronger compression
            }
          }
        }

        // If even lowest quality is larger, use lowest quality
        if (!bestBlob) {
          bestBlob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/jpeg", 0.05);
          });
        }
        finalBlob = bestBlob;
      } else {
        // Compress directly with selected quality slider
        finalBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
        });
      }

      if (finalBlob) {
        setCompressedSize(finalBlob.size);
        if (compressedUrl) {
          URL.revokeObjectURL(compressedUrl);
        }
        setCompressedUrl(URL.createObjectURL(finalBlob));
      }
      setIsCompressing(false);
    };
  };

  const downloadCompressed = () => {
    if (!compressedUrl || !originalFile) return;
    const link = document.createElement("a");
    const nameParts = originalFile.name.split(".");
    const ext = nameParts.pop();
    const newName = `${nameParts.join(".")}-compressed.jpg`;
    
    link.download = newName;
    link.href = compressedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const reductionPercentage = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
              1. Upload Original Image
            </h3>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px] ${
                dragActive ? "bg-blue-500/10 border-blue-500" : "border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-3">
                <LucideIcon name="UploadCloud" size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Drag & drop or Click to select image
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports JPEG, PNG, and WebP (max 20MB)
              </p>
            </div>
          </div>

          {originalFile && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
                  2. Choose Compression Mode
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setTargetSizeKb(null); setQuality(0.7); }}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                      targetSizeKb === null
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Adjust Quality Slider
                  </button>
                  <button
                    onClick={() => setTargetSizeKb(100)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                      targetSizeKb !== null
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Target Specific Size (KB)
                  </button>
                </div>
              </div>

              {targetSizeKb === null ? (
                <div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>Compression Quality ({Math.round(quality * 100)}%)</span>
                    <span>{quality < 0.4 ? "High Compress" : quality > 0.85 ? "Maximum Clarity" : "Optimal"}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Set Target Output Size Limit
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[20, 50, 100].map((size) => (
                      <button
                        key={size}
                        onClick={() => setTargetSizeKb(size)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          targetSizeKb === size
                            ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950"
                        }`}
                      >
                        {size} KB Limit
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <input
                      type="number"
                      value={targetSizeKb}
                      onChange={(e) => setTargetSizeKb(Math.max(5, Number(e.target.value)))}
                      className="w-24 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-sm"
                    />
                    <span className="text-xs text-slate-500">
                      Set maximum target file size.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preview Results Column */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          {originalFile ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Original Size</span>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200">{formatSize(originalSize)}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Compressed Size</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {isCompressing ? "Compressing..." : formatSize(compressedSize)}
                  </p>
                </div>
              </div>

              {reductionPercentage > 0 && !isCompressing && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <LucideIcon name="TrendingDown" size={16} /> Saved {reductionPercentage}% of original file size!
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Original Cover</span>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Compressed Output</span>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative">
                    {isCompressing ? (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                        <LucideIcon name="Loader" className="animate-spin mb-2" size={24} />
                        <span className="text-xs">Processing...</span>
                      </div>
                    ) : compressedUrl ? (
                      <img
                        src={compressedUrl}
                        alt="Compressed"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <button
                onClick={downloadCompressed}
                disabled={isCompressing || !compressedUrl}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer disabled:opacity-50"
              >
                <LucideIcon name="Download" size={18} /> Download Optimized Image
              </button>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <LucideIcon name="Image" className="text-slate-300 mb-2" size={48} />
              <p className="text-slate-650 text-sm font-bold">
                No image selected
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                Upload a photo to see real-time size comparisons and estimates.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
