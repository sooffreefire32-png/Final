import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import { LucideIcon } from "../LucideIcon";

export const QrCodeScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isScanningLive, setIsScanningLive] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanningLive(false);
  };

  const startCamera = async () => {
    setErrorMsg("");
    setScanResult("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true"); // required for iOS
        videoRef.current.play();
        setIsScanningLive(true);
        animationFrameIdRef.current = requestAnimationFrame(scanLiveFrame);
      }
    } catch (err) {
      console.error("Camera access failed", err);
      setErrorMsg("Failed to access camera. Please make sure you have given permission or upload an image instead.");
    }
  };

  const scanLiveFrame = () => {
    if (videoRef.current && canvasRef.current && isScanningLive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          setScanResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    if (isScanningLive) {
      animationFrameIdRef.current = requestAnimationFrame(scanLiveFrame);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    setErrorMsg("");
    setScanResult("");
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            setScanResult(code.data);
          } else {
            setErrorMsg("Could not find any readable QR Code in this image. Please make sure the QR code is clear and highly visible.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
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
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scanResult);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Scanner View Column */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 w-full">
            1. Capture or Upload QR
          </h3>

          <div className="w-full aspect-video sm:aspect-square max-w-sm relative rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
            
            {/* Live Camera View */}
            {isScanningLive && (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Hidden canvas for decoding */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Drag & Drop UI (shown when not scanning live) */}
            {!isScanningLive && (
              <label
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors ${
                  dragActive ? "bg-blue-500/10 border-blue-500" : "hover:bg-slate-100 dark:hover:bg-slate-900/50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-4">
                  <LucideIcon name="UploadCloud" size={24} />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Drag & drop QR image
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  or click to browse from device (JPG, PNG, WebP)
                </p>
              </label>
            )}

            {/* Scanning Overlay Target Border */}
            {isScanningLive && (
              <div className="absolute inset-12 border-2 border-blue-500 rounded-2xl animate-pulse pointer-events-none flex items-center justify-center">
                <div className="w-full h-0.5 bg-blue-500 absolute top-1/2 left-0 transform -translate-y-1/2 animate-bounce" />
              </div>
            )}
          </div>

          <div className="flex gap-4 w-full max-w-sm mt-4">
            {!isScanningLive ? (
              <button
                onClick={startCamera}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all cursor-pointer shadow-lg shadow-blue-500/10"
              >
                <LucideIcon name="Camera" size={18} /> Start Camera Scanner
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors cursor-pointer"
              >
                <LucideIcon name="Square" size={18} /> Stop Camera
              </button>
            )}
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              2. Scan Decoded Output
            </h3>

            {errorMsg && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                <LucideIcon name="AlertTriangle" className="shrink-0 mt-0.5" size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {scanResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-emerald-800 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                  <LucideIcon name="CheckCircle" size={16} /> Successful Decode!
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Scanned Contents
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-sm break-all max-h-60 overflow-y-auto">
                    {scanResult}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:opacity-90 font-medium transition-opacity cursor-pointer text-sm"
                  >
                    <LucideIcon name="Copy" size={16} /> Copy to Clipboard
                  </button>

                  {scanResult.startsWith("http") && (
                    <a
                      href={scanResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium transition-colors text-sm"
                    >
                      <LucideIcon name="ExternalLink" size={16} /> Open URL link
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-48 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl flex flex-col items-center justify-center text-center p-6">
                <LucideIcon name="QrCode" className="text-slate-300 dark:text-slate-700 mb-2" size={36} />
                <p className="text-slate-500 text-sm">
                  Ready to scan
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Decoded information and action options will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Privacy Statement
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We care about security. QR Code detection executes entirely locally inside your browser using client-side Web APIs and canvas pixels. No data, files, or video streams are ever uploaded or transmitted to our servers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
