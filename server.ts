import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { getToolBySlug } from "./src/utils/seoData";

// Load environment variables (.env)
dotenv.config();

const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Helper to inject SEO tags dynamically into HTML stream
function injectSEOTags(html: string, title: string, description: string, url: string): string {
  // 1. Replace <title>
  if (html.includes("<title>")) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  } else {
    html = html.replace("</head>", `  <title>${title}</title>\n</head>`);
  }

  // Remove existing duplicate meta/canonical tags to clean up
  html = html.replace(/<meta name="description"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:title"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:description"[^>]*>/gi, "");
  html = html.replace(/<link rel="canonical"[^>]*>/gi, "");

  // 2. Inject fresh SEO tags right before </head>
  const tagsToInject = `  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${url}" />`;

  html = html.replace("</head>", `${tagsToInject}\n</head>`);
  return html;
}

// Vite & Static file serving handler
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    console.log("Configuring development server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const ext = path.extname(req.path);
      // Let static assets pass through to Vite middleware
      if (ext && ext !== ".html") {
        return next();
      }

      try {
        const url = req.originalUrl;
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");

        // Apply Vite HTML transforms (HMR, styling links, etc.)
        html = await vite.transformIndexHtml(url, html);

        // Get slug
        const slug = req.path.replace(/^\/+|\/+$/g, "");
        const tool = getToolBySlug(slug);

        const title = tool?.titleTag || (tool?.name ? `${tool.name} | QRToolkit` : "QRToolkit | 100% Free Local SaaS Utilities & Core Calculators");
        const description = tool?.metaDesc || tool?.shortDesc || "Access 100% free offline-safe tools. Generate custom QR codes, barcodes, compress media, run advanced math calculators, and format code locally in your browser.";
        const canonicalUrl = `https://${req.headers.host || "localhost:3000"}${req.path}`;

        const injectedHtml = injectSEOTags(html, title, description, canonicalUrl);
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(injectedHtml);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production mode
    console.log("Configuring production server serving static build assets...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files excluding index.html to prevent premature index.html transmission
    app.use(express.static(distPath, { index: false }));
    
    app.get("*", (req, res) => {
      const ext = path.extname(req.path);
      if (ext && ext !== ".html") {
        return res.status(404).send("Not found");
      }

      const indexPath = path.join(distPath, "index.html");
      fs.readFile(indexPath, "utf-8", (err, html) => {
        if (err) {
          console.error("Error reading production index.html:", err);
          return res.status(500).send("Server Error");
        }

        const slug = req.path.replace(/^\/+|\/+$/g, "");
        const tool = getToolBySlug(slug);

        const title = tool?.titleTag || (tool?.name ? `${tool.name} | QRToolkit` : "QRToolkit | 100% Free Local SaaS Utilities & Core Calculators");
        const description = tool?.metaDesc || tool?.shortDesc || "Access 100% free offline-safe tools. Generate custom QR codes, barcodes, compress media, run advanced math calculators, and format code locally in your browser.";
        const canonicalUrl = `https://${req.headers.host || "qrtoolkit.com"}${req.path}`;

        const injectedHtml = injectSEOTags(html, title, description, canonicalUrl);
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(injectedHtml);
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on host 0.0.0.0 and port ${PORT}`);
  });
}

setupServer();

