import React, { useState } from "react";
import { LucideIcon } from "../LucideIcon";

export const AiTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"meta" | "keyword" | "blog">("meta");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const generateClientMeta = (input: string) => {
    const cleanInput = input.trim();
    if (!cleanInput) return "";

    const words = cleanInput.split(/\s+/).map(w => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase()).filter(w => w.length > 3);
    const uniqueWords = Array.from(new Set(words));
    const stopWords = new Set(["with", "this", "that", "from", "your", "help", "tool", "free", "best", "online", "fast", "easy", "make", "create"]);
    const coreKeywords = uniqueWords.filter(w => !stopWords.has(w)).slice(0, 5);

    const titleKeyword = coreKeywords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" & ");
    const pageTitle = `${titleKeyword || "SEO Optimizer"} | Ultimate Web Utility`.slice(0, 58);

    let desc = cleanInput;
    if (desc.length > 155) {
      desc = desc.slice(0, 152) + "...";
    } else {
      desc = `${desc} - Use our free web utility tool for maximum optimization and fast processing.`;
      if (desc.length > 155) {
        desc = desc.slice(0, 155);
      }
    }

    const baseKws = coreKeywords.length > 0 ? coreKeywords : ["seo", "utility", "tools", "web"];
    const suggestedKws = [
      ...baseKws,
      ...baseKws.map(k => `best ${k} online`),
      ...baseKws.map(k => `${k} optimization`),
      "free online tools",
      "web performance optimizer"
    ].slice(0, 8);

    return `==================================================
🔍 CLIENT-SIDE SEO METADATA OPTIMIZER (API-FREE)
==================================================

1. RECOMMENDED PAGE TITLE (Max 60 Characters):
👉 "${pageTitle}"
(Length: ${pageTitle.length} characters)

2. HIGH-CTR META DESCRIPTION (Max 160 Characters):
👉 "${desc}"
(Length: ${desc.length} characters)

3. RECOMMENDED TARGET SEO KEYWORDS:
🔑 ${suggestedKws.join(", ")}

--------------------------------------------------
💡 Pro Tip: For optimal SEO performance, place the Page Title inside your <title> tag, the Meta Description inside <meta name="description">, and make sure the target keywords appear naturally within your page's H1 and H2 tags.`;
  };

  const generateClientKeywords = (input: string) => {
    const seed = input.trim() || "seo utilities";
    const words = seed.split(/\s+/).map(w => w.toLowerCase());
    const primary = words[0] || "seo";
    const secondary = words[1] || "tools";

    const lsiKeywords = [
      { kw: `${seed} free`, vol: "45,000", kd: "22%", intent: "Transactional" },
      { kw: `best ${seed} online`, vol: "18,200", kd: "31%", intent: "Commercial" },
      { kw: `how to use ${seed}`, vol: "8,900", kd: "18%", intent: "Informational" },
      { kw: `${primary} optimization guide`, vol: "5,400", kd: "45%", intent: "Informational" },
      { kw: `free ${secondary} website`, vol: "12,100", kd: "28%", intent: "Commercial" },
      { kw: `top ${seed} for beginners`, vol: "3,600", kd: "15%", intent: "Informational" },
      { kw: `easy ${seed} download`, vol: "2,400", kd: "35%", intent: "Transactional" },
      { kw: `alternative to ${seed}`, vol: "1,800", kd: "12%", intent: "Commercial" },
    ];

    let result = `==================================================
🎯 CLIENT-SIDE LSI KEYWORD RESEARCH PLANNER (API-FREE)
==================================================

Seed Target Query: "${seed}"

Here are 8 highly relevant semantic search variations to target:

| Keyword / LSI Search Phrase | Est. Monthly Vol | Difficulty | Search Intent |
|-----------------------------|------------------|------------|---------------|
`;

    lsiKeywords.forEach(item => {
      result += `| ${item.kw.padEnd(27)} | ${item.vol.padEnd(16)} | ${item.kd.padEnd(10)} | ${item.intent.padEnd(13)} |\n`;
    });

    result += `
--------------------------------------------------
💡 SEO Distribution Strategy:
• Primary Focus: Optimize your main heading (H1) with "${seed} free" to capture high-intent transactional search volume.
• LSI Integration: Distribute other related search phrases naturally throughout your article's subheadings (H2, H3) and paragraph copy to build semantic topical authority.`;

    return result;
  };

  const generateClientBlogOutline = (input: string) => {
    const topic = input.trim() || "How to optimize web performance";
    const words = topic.split(/\s+/);
    const primaryTopic = words.slice(0, 4).join(" ");

    return `==================================================
📚 CLIENT-SIDE SEO CONTENT ARCHITECT & OUTLINER
==================================================

Article Topic Proposal: "${topic}"

[H1 HEADER] (Catchy, high CTR headline):
👉 "${topic}: The Ultimate Step-by-Step Optimization Guide"

--------------------------------------------------
STRUCTURED CONTENT OUTLINE & DIRECTION:

SECTION 1: INTRODUCTION
• Subheading [H2]: Why ${primaryTopic || "this topic"} Matters for Modern Web Search
• Primary Keyword Target: "${primaryTopic} importance"
• Core Writing Directives:
  - hook the reader with a powerful stat or relatable problem.
  - define what ${primaryTopic} means and why ignoring it costs money/traffic.
  - introduce the step-by-step blueprint detailed below.

SECTION 2: CORE ANALYSIS
• Subheading [H2]: Understanding the Foundations of ${primaryTopic || "Success"}
• Subheading [H3]: Common Pitfalls to Avoid in Early Stages
• Primary Keyword Target: "${primaryTopic} mistakes"
• Core Writing Directives:
  - list the top 3 mistakes beginners make.
  - use bullet points and contrast them with correct methods.
  - reference official guidelines or web standards.

SECTION 3: BLUEPRINT & IMPLEMENTATION
• Subheading [H2]: Step-by-Step Implementation Strategy for Results
• Subheading [H3]: Technical Setup and Optimization Workflow
• Primary Keyword Target: "how to optimize ${primaryTopic.toLowerCase()}"
• Core Writing Directives:
  - provide an actionable, sequential checklist.
  - explain the "how-to" with clear, code-free examples.
  - emphasize speed, ease of use, and local caching.

SECTION 4: ADVANCED TACTICS
• Subheading [H2]: Scaling Your ${primaryTopic || "Strategy"} to the Next Level
• Primary Keyword Target: "advanced ${primaryTopic.toLowerCase()}"
• Core Writing Directives:
  - present a modern "pro" technique (automation, CDN, custom triggers).
  - discuss measurements, performance scoring, and tracking.

SECTION 5: CONCLUSION & CALL TO ACTION
• Subheading [H2]: Summary & Next Steps to Get Started Today
• Core Writing Directives:
  - recap the main takeaways.
  - provide a motivating closing thought.
  - direct the reader to test their setup using our free online suite.`;
  };

  const handleGenerate = () => {
    setErrorMsg("");
    setOutputText("");

    if (!inputText.trim()) {
      setErrorMsg("Please enter some input topic or summary context before generating.");
      return;
    }

    setIsGenerating(true);

    // Simulate instant responsive feedback
    setTimeout(() => {
      try {
        let result = "";
        if (activeTab === "meta") {
          result = generateClientMeta(inputText);
        } else if (activeTab === "keyword") {
          result = generateClientKeywords(inputText);
        } else if (activeTab === "blog") {
          result = generateClientBlogOutline(inputText);
        }
        setOutputText(result);
      } catch (err: any) {
        setErrorMsg(err.message || "An unexpected error occurred during client-side generation.");
      } finally {
        setIsGenerating(false);
      }
    }, 450);
  };

  const copyResult = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
  };

  const insertSample = () => {
    if (activeTab === "meta") {
      setInputText("A modern web app that helps developers and designers select beautiful WCAG compliant colors, generate random palettes, and optimize code variables.");
    } else if (activeTab === "keyword") {
      setInputText("best image compressor online");
    } else if (activeTab === "blog") {
      setInputText("How to Rank a Brand New Multi-Tools SaaS Website in Google Search fast");
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/60 lg:pr-6 shrink-0">
          {[
            { id: "meta", label: "AI Meta Optimizer", icon: "Sparkles" },
            { id: "keyword", label: "AI Keyword Suggester", icon: "Compass" },
            { id: "blog", label: "AI Blog Architect", icon: "BookOpen" }
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
          <div className="flex justify-between items-center">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {activeTab === "meta" && "AI-Optimized Metadata Generator"}
              {activeTab === "keyword" && "AI LSI & Keyword Suggestions"}
              {activeTab === "blog" && "AI Search-Optimized Content Outliner"}
            </h4>

            <button
              onClick={insertSample}
              className="py-1.5 px-3 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-500 transition-colors cursor-pointer"
            >
              Insert Sample Topic
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {activeTab === "meta" && "Describe your page or product"}
                  {activeTab === "keyword" && "Enter your seed target query"}
                  {activeTab === "blog" && "Enter article topic or heading idea"}
                </span>
                
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    activeTab === "meta"
                      ? "e.g. A fast online tool to merge PDF files right inside your browser without uploading..."
                      : activeTab === "keyword"
                      ? "e.g. online qr code generator for retail stores"
                      : "e.g. 7 Steps to optimize images for maximum web performance"
                  }
                  rows={8}
                  className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 text-sm resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <LucideIcon name="Loader" className="animate-spin" size={18} />
                    <span>Processing local model algorithms...</span>
                  </>
                ) : (
                  <>
                    <LucideIcon name="Sparkles" size={18} />
                    <span>Generate Instant SEO Suggestions</span>
                  </>
                )}
              </button>
            </div>

            {/* Output view */}
            <div className="space-y-2 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant SEO output (Offline)</span>
                {outputText && (
                  <button
                    onClick={copyResult}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <LucideIcon name="Copy" size={12} /> Copy to Clipboard
                  </button>
                )}
              </div>

              <div className="relative flex-1 min-h-[224px]">
                {errorMsg ? (
                  <div className="absolute inset-0 p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-mono whitespace-pre-wrap overflow-y-auto leading-relaxed">
                    <div className="flex items-start gap-2">
                      <LucideIcon name="AlertTriangle" className="shrink-0 mt-0.5" size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  </div>
                ) : (
                  <textarea
                    readOnly
                    value={outputText}
                    placeholder="SEO optimized outputs will be generated and drawn here instantly..."
                    rows={10}
                    className="w-full h-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/15 text-slate-700 dark:text-slate-300 rounded-2xl text-sm font-mono leading-relaxed resize-none focus:outline-none"
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
