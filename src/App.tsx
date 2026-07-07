import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { FaqSection } from "./components/FaqSection";
import { ToolWrapper } from "./components/ToolWrapper";
import { AdsPlaceholder } from "./components/AdsPlaceholder";

// Core Interactive Tools
import { QrCodeGenerator } from "./components/tools/QrCodeGenerator";
import { QrCodeScanner } from "./components/tools/QrCodeScanner";
import { BarcodeGenerator } from "./components/tools/BarcodeGenerator";
import { ImageCompressor } from "./components/tools/ImageCompressor";
import { ImageConverter } from "./components/tools/ImageConverter";
import { PasswordGenerator } from "./components/tools/PasswordGenerator";
import { UnitConverter } from "./components/tools/UnitConverter";
import { Calculators } from "./components/tools/Calculators";
import { SeoTools } from "./components/tools/SeoTools";
import { WordCounter } from "./components/tools/WordCounter";
import { CaseConverter } from "./components/tools/CaseConverter";

// SEO Data Resolver
import { getToolBySlug } from "./utils/seoData";
import { Tool } from "./types";

export default function App() {
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [seoHeading, setSeoHeading] = useState<string>("");
  const [seoDescription, setSeoDescription] = useState<string>("");

  // Multi-method routing (pathname, search query, or hash) for perfect Google Search direct landing
  useEffect(() => {
    const handleRoute = () => {
      // 1. Check pathname (e.g., /barcode-generator)
      let slug = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");

      // 2. Check query params (e.g., ?tool=barcode-generator)
      if (!slug) {
        const urlParams = new URLSearchParams(window.location.search);
        slug = urlParams.get("tool") || urlParams.get("utility") || "";
      }

      // 3. Check hash fallback (e.g., #barcode-generator)
      if (!slug) {
        slug = window.location.hash.replace("#", "");
      }

      if (slug) {
        const resolved = getToolBySlug(slug);
        if (resolved) {
          setCurrentTool(resolved);
          setSeoHeading(resolved.h1Title || resolved.name);
          setSeoDescription(resolved.metaDesc || resolved.shortDesc);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      // Default home state
      setCurrentTool(null);
      setSeoHeading("");
      setSeoDescription("");
    };

    // Listen to back/forward navigation and hash changes
    handleRoute();
    window.addEventListener("popstate", handleRoute);
    window.addEventListener("hashchange", handleRoute);
    return () => {
      window.removeEventListener("popstate", handleRoute);
      window.removeEventListener("hashchange", handleRoute);
    };
  }, []);

  // Dynamically update document title and meta tags for Google crawlers / SEO indexation
  useEffect(() => {
    if (currentTool) {
      const title = currentTool.titleTag || `${currentTool.name} | QRToolkit`;
      const desc = currentTool.metaDesc || currentTool.shortDesc;
      
      document.title = title;
      
      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);
      
      // Update Open Graph Title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      // Update Open Graph Description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', desc);
    } else {
      const defaultTitle = "QRToolkit | 100% Free Local SaaS Utilities & Core Calculators";
      const defaultDesc = "Access 100% free offline-safe tools. Generate custom QR codes, barcodes, compress media, run advanced math calculators, and format code locally in your browser.";
      
      document.title = defaultTitle;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', defaultDesc);
      }
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', defaultTitle);
      }
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', defaultDesc);
      }
    }
  }, [currentTool]);

  const handleSelectTool = (slug: string) => {
    try {
      // Update browser pathname for clean SEO URLs
      window.history.pushState({ tool: slug }, "", `/${slug}`);
    } catch (e) {
      console.warn("pushState blocked by browser sandbox/iframe, falling back to hash", e);
    }
    // Set hash as robust fallback so navigation remains stable across different contexts
    window.location.hash = slug;

    const resolved = getToolBySlug(slug);
    if (resolved) {
      setCurrentTool(resolved);
      setSeoHeading(resolved.h1Title || resolved.name);
      setSeoDescription(resolved.metaDesc || resolved.shortDesc);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoHome = () => {
    try {
      window.history.pushState({}, "", "/");
    } catch (e) {
      console.warn("pushState blocked", e);
    }
    window.location.hash = "";
    setCurrentTool(null);
    setSeoHeading("");
    setSeoDescription("");
  };

  const renderActiveTool = () => {
    if (!currentTool) return null;

    switch (currentTool.slug) {
      case "qr-code-generator":
        return <QrCodeGenerator />;
      case "qr-code-scanner":
        return <QrCodeScanner />;
      case "barcode-generator":
        return <BarcodeGenerator />;
      case "image-compressor":
        return <ImageCompressor />;
      case "image-converter":
        return <ImageConverter />;
      case "password-generator":
        return <PasswordGenerator />;
      case "unit-converter":
        return <UnitConverter />;
      case "calculators":
        return <Calculators />;
      case "seo-tools":
        return <SeoTools />;
      case "word-counter":
        return <WordCounter />;
      case "case-converter":
        return <CaseConverter />;
      default:
        return (
          <div className="p-10 text-center font-bold text-red-500">
            Tool Component Not Bound
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Dynamic Header / Navigation */}
      <header className="pt-6 space-y-4">
        <Navbar
          onSelectTool={handleSelectTool}
          onGoHome={handleGoHome}
          currentTool={currentTool}
        />
        {/* Site-wide Header Ads placement */}
        <AdsPlaceholder className="my-2" />
      </header>

      {/* Main Page Content Body */}
      <main className="flex-1 py-6">
        {currentTool ? (
          /* Wrapped SEO Tool View */
          <ToolWrapper
            tool={currentTool}
            seoHeading={seoHeading}
            seoDescription={seoDescription}
            onSelectTool={handleSelectTool}
          >
            {renderActiveTool()}
          </ToolWrapper>
        ) : (
          /* Main Homepage Landing View */
          <div className="space-y-12">
            <HeroSection onSelectTool={handleSelectTool} />
            <AdsPlaceholder type="leaderboard" />
            <StatsSection />
            <WhyChooseUs />
            <AdsPlaceholder type="native" />
            <FaqSection />
          </div>
        )}
      </main>

      {/* Footer / Sitemap Catalog */}
      <Footer onSelectTool={handleSelectTool} onGoHome={handleGoHome} />

    </div>
  );
}
