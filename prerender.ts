import fs from "fs";
import path from "path";
import { getToolBySlug } from "./src/utils/seoData";

// Comprehensive list of all slugs/routes to pre-render
const slugsToPrerender = [
  // Core Tools
  "qr-code-generator",
  "qr-code-scanner",
  "barcode-generator",
  "image-compressor",
  "image-converter",
  "password-generator",
  "word-counter",
  "case-converter",
  "unit-converter",
  "calculators",

  // Virtual Subcategory routes
  "image-compressor-100kb",
  "image-compressor-50kb",
  "image-compressor-20kb",
  "jpeg-compressor",
  "png-compressor",
  
  "qr-code-generator-for-whatsapp",
  "qr-code-generator-for-wifi",
  "qr-code-generator-for-vcard",
  
  "strong-password-generator",
  "random-password-generator",
  "secure-password-generator",
  
  "length-converter",
  "weight-converter",
  "temperature-converter",
  "speed-converter",
  "area-converter",
  "storage-converter",
  
  "jpg-to-png",
  "png-to-webp",
  "webp-to-jpg",
  "heic-to-jpg",
  
  "character-counter",
  "markdown-to-html",
  "html-to-markdown"
];

const distPath = path.join(process.cwd(), "dist");
const indexPath = path.join(distPath, "index.html");

function injectSEOTags(html: string, title: string, description: string, url: string): string {
  // Replace <title>
  if (html.includes("<title>")) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  } else {
    html = html.replace("</head>", `  <title>${title}</title>\n</head>`);
  }

  // Remove existing metadata for description, og, and canonical url to avoid duplicates
  html = html.replace(/<meta name="description"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:title"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:description"[^>]*>/gi, "");
  html = html.replace(/<link rel="canonical"[^>]*>/gi, "");

  // Inject fresh custom tags
  const tagsToInject = `  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${url}" />`;

  return html.replace("</head>", `${tagsToInject}\n</head>`);
}

function prerender() {
  if (!fs.existsSync(indexPath)) {
    console.error("index.html not found in dist/! Make sure 'vite build' runs first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");

  console.log(`Starting static pre-rendering (SSG) of ${slugsToPrerender.length} routes...`);

  slugsToPrerender.forEach((slug) => {
    const tool = getToolBySlug(slug);
    const title = tool?.titleTag || (tool?.name ? `${tool.name} | QRToolkit` : "QRToolkit | 100% Free Local SaaS Utilities & Core Calculators");
    const description = tool?.metaDesc || tool?.shortDesc || "Access 100% free offline-safe tools. Generate custom QR codes, barcodes, compress media, run advanced math calculators, and format code locally in your browser.";
    const canonicalUrl = `https://qrtoolkit.site/${slug}`;

    const prerenderedHtml = injectSEOTags(baseHtml, title, description, canonicalUrl);

    // Create directory dist/[slug]
    const routeDir = path.join(distPath, slug);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Write dist/[slug]/index.html
    const routeIndexPath = path.join(routeDir, "index.html");
    fs.writeFileSync(routeIndexPath, prerenderedHtml, "utf-8");
    console.log(`✓ Prerendered /${slug} -> dist/${slug}/index.html`);
  });

  console.log("Prerendering completed successfully!");
}

prerender();
