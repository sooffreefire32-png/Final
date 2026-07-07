import { Tool, Category } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "qr",
    name: "QR & Barcode",
    desc: "Generate and scan QR codes and barcodes instantly",
    icon: "QrCode",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "image",
    name: "Image & Media",
    desc: "Compress, convert, and edit images right in your browser",
    icon: "Image",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "password",
    name: "Security & Passwords",
    desc: "Create ultra-secure passwords and evaluate strength",
    icon: "ShieldAlert",
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "text",
    name: "Text Utilities",
    desc: "Format, convert, and analyze textual content",
    icon: "FileText",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "calculator",
    name: "Calculators",
    desc: "Financial, scientific, health, and age calculators",
    icon: "Calculator",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: "converter",
    name: "Unit Converters",
    desc: "Convert lengths, weights, temperature, and speeds",
    icon: "Scale",
    color: "from-teal-500 to-emerald-600"
  }
];

export const CORE_TOOLS: Tool[] = [
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    shortDesc: "Generate custom high-resolution QR codes for websites, WiFi, WhatsApp, or vCard.",
    category: "qr",
    icon: "QrCode",
    isPopular: true,
    isTrending: true,
    isLatest: false,
    titleTag: "Free QR Code Generator | Custom QR Codes with Logo",
    metaDesc: "Create custom QR codes for WhatsApp, WiFi, SMS, URLs and vCard. Download high-quality QR codes instantly. 100% free with no expiration.",
    h1Title: "Free Custom QR Code Generator",
    introText: "Generate high-resolution QR codes with customizable colors, sizes, and formats. Create instantly for URLs, WhatsApp messages, WiFi credentials, vCard, or plain text.",
    detailedGuide: "To use the QR Code Generator, select your content type (URL, Text, WiFi, WhatsApp, or Contact), enter the required information, customize your primary and background colors, and click Download. Your generated QR code does not expire and can be scanned by any smartphone camera.",
    steps: [
      { title: "Select Content Type", description: "Choose between URL, WiFi networks, WhatsApp, Contact (vCard), or plain Text." },
      { title: "Fill Details", description: "Input the link, phone number, network credentials, or contact details." },
      { title: "Customize Design", description: "Adjust the foreground and background colors to match your brand." },
      { title: "Download QR", description: "Click 'Download PNG' to save your high-resolution QR code directly to your device." }
    ],
    faqs: [
      { question: "Do these QR codes expire?", answer: "No, these are static QR codes, meaning they contain the actual data and will never expire." },
      { question: "Can I use these QR codes for commercial use?", answer: "Yes! All QR codes generated here are 100% free for both personal and commercial use." },
      { question: "How do I customize the QR code color?", answer: "Use our built-in color picker to choose any primary/foreground and background color." }
    ],
    relatedSlugs: ["qr-code-scanner", "barcode-generator", "url-encoder"]
  },
  {
    id: "qr-code-scanner",
    slug: "qr-code-scanner",
    name: "QR Code Scanner",
    shortDesc: "Scan QR codes in real-time using your webcam or by uploading image files.",
    category: "qr",
    icon: "Scan",
    isPopular: false,
    isTrending: true,
    isLatest: false,
    titleTag: "Online QR Code Scanner | Scan via Camera or Image",
    metaDesc: "Scan QR codes instantly. Use your mobile or computer webcam for real-time scanning, or upload an image file (PNG, JPG) to read QR data instantly.",
    h1Title: "Online QR Code Scanner",
    introText: "Instantly scan and read QR codes. You can grant camera permission for real-time video stream scanning or simply upload/drag-and-drop any QR code image.",
    detailedGuide: "Our QR Code Scanner runs completely client-side in your browser, meaning your camera feed and images are never sent to a server, guaranteeing 100% privacy. Scan websites, contacts, WiFis, and copy results with one click.",
    steps: [
      { title: "Choose Scanning Method", description: "Grant camera permissions for live scanning or select 'Upload Image'." },
      { title: "Point or Upload", description: "Align the QR code in your camera view, or select an image file." },
      { title: "View Decoded Output", description: "The system instantly reads the code and reveals the text/URL." },
      { title: "Action Output", description: "Copy the decoded text or open the scanned URL in a new tab." }
    ],
    faqs: [
      { question: "Is my camera feed private?", answer: "Absolutely. The scanning process is executed entirely in your browser using JavaScript. No video data leaves your device." },
      { question: "Can I scan blurry QR codes?", answer: "Yes, our scanning engine is highly robust, but for best results, ensure adequate lighting and hold the code steady." }
    ],
    relatedSlugs: ["qr-code-generator", "barcode-generator"]
  },
  {
    id: "barcode-generator",
    slug: "barcode-generator",
    name: "Barcode Generator",
    shortDesc: "Generate standard barcodes (Code 128, EAN, UPC) for products and inventory management.",
    category: "qr",
    icon: "Barcode",
    isPopular: false,
    isTrending: false,
    isLatest: true,
    titleTag: "Free Online Barcode Generator | Code 128 & EAN",
    metaDesc: "Generate custom barcodes in formats like Code 128, EAN, UPC, and Code 39. Free, fast and high resolution. Perfect for retail and inventory.",
    h1Title: "Free Online Barcode Generator",
    introText: "Quickly generate high-quality barcodes for inventory, retail, or tracking. Supports popular formats like Code 128, Code 39, EAN-13, and UPC-A.",
    detailedGuide: "Select your preferred barcode format, enter your barcode value/digits, customize colors, and download. Use Code 128 for general alphanumeric tracking, EAN-13 for standard retail products, and UPC-A for American retail.",
    steps: [
      { title: "Select Barcode Format", description: "Choose Code 128 (default), EAN, UPC, or Code 39." },
      { title: "Input Code Value", description: "Type the numeric or alphanumeric data for your barcode." },
      { title: "Style and Customize", description: "Optionally hide/show text value and modify bar colors." },
      { title: "Download", description: "Download the barcode as a PNG image for printing." }
    ],
    faqs: [
      { question: "Which barcode format should I choose?", answer: "Use Code 128 for general inventory/shipping packages as it supports letters and numbers. Use EAN-13/UPC-A for retail items." },
      { question: "How many digits does EAN-13 require?", answer: "EAN-13 requires exactly 12 numeric digits. The 13th digit is a checksum generated automatically." }
    ],
    relatedSlugs: ["qr-code-generator", "base64-encoder"]
  },
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    shortDesc: "Compress JPEG, PNG, and WebP images in-browser while preserving perfect visual quality.",
    category: "image",
    icon: "Shrink",
    isPopular: true,
    isTrending: true,
    isLatest: false,
    titleTag: "Online Image Compressor | Compress JPEG & PNG Free",
    metaDesc: "Compress images up to 80% without losing quality. Bulk compress JPG, PNG, and WebP images client-side. Fast, secure, and completely free.",
    h1Title: "Smart Image Compressor",
    introText: "Reduce image file sizes instantly while maintaining high visual fidelity. Adjust the quality slider to find your perfect balance of size and sharpness.",
    detailedGuide: "Drag and drop your JPG, PNG, or WebP files. Our tool processes the images locally inside your browser using canvas rendering. Since your photos are never uploaded to our server, your privacy is completely secure.",
    steps: [
      { title: "Upload Images", description: "Select or drag-and-drop JPEG, PNG, or WebP files." },
      { title: "Adjust Quality", description: "Use the quality slider to set your target compression strength." },
      { title: "Preview Dimensions", description: "View real-time original size vs compressed size and reduction percentage." },
      { title: "Download File", description: "Download the compressed file with high visual clarity." }
    ],
    faqs: [
      { question: "Is there a limit on the number of images I can compress?", answer: "No, you can compress as many images as you want completely free of charge." },
      { question: "Is my privacy protected?", answer: "Yes, compression is done 100% locally in your browser. Your images are never sent to a backend server." }
    ],
    relatedSlugs: ["image-converter", "color-picker"]
  },
  {
    id: "image-converter",
    slug: "image-converter",
    name: "Image Converter",
    shortDesc: "Convert images between JPG, PNG, WebP, GIF, and PDF formats instantly.",
    category: "image",
    icon: "ImagePlay",
    isPopular: true,
    isTrending: false,
    isLatest: false,
    titleTag: "Image Converter | Convert JPG, PNG, WebP Free Online",
    metaDesc: "Convert your images to JPG, PNG, WebP, or PDF formats in seconds. High-speed browser conversion with custom sizing. Safe and private.",
    h1Title: "Online Image Converter",
    introText: "Easily switch your image formats. Select JPG, PNG, WebP, or PDF as the target, set dimensions if desired, and convert with pristine output.",
    detailedGuide: "Select an image from your drive, pick the format you wish to convert it to (such as PNG to WebP, or JPG to PNG), scale the resolution if needed, and download the new file. All conversions are client-side.",
    steps: [
      { title: "Upload Source Image", description: "Select any JPG, PNG, WebP, or other common image file." },
      { title: "Select Output Format", description: "Choose the format: PNG, JPG, WebP, or PDF." },
      { title: "Configure Sizing", description: "Optionally adjust width and height to resize the image." },
      { title: "Convert and Save", description: "Click convert to generate the file and download it." }
    ],
    faqs: [
      { question: "Can I convert PNG transparency to JPG?", answer: "Yes, but note that JPG does not support transparency, so any transparent background will become white." },
      { question: "Can I batch convert files?", answer: "Our interface allows you to upload and convert files sequentially at lightning speeds." }
    ],
    relatedSlugs: ["image-compressor", "base64-encoder"]
  },
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Password Generator",
    shortDesc: "Create strong, random, and cryptographically secure passwords to protect your accounts.",
    category: "password",
    icon: "Lock",
    isPopular: true,
    isTrending: true,
    isLatest: false,
    titleTag: "Strong Password Generator | Secure Random Passwords",
    metaDesc: "Generate highly secure random passwords with our free password generator. Customize length, uppercase letters, lowercase, numbers, and symbols.",
    h1Title: "Strong Password Generator",
    introText: "Protect your personal accounts from brute-force attacks. Generate strong, completely randomized passwords with custom parameters, and test their strength instantly.",
    detailedGuide: "Specify password length (we recommend 16+ characters), toggle uppercase/lowercase letters, numbers, and symbols. The tool automatically analyzes the generated string's cryptographic entropy and rates its strength from Weak to Strong.",
    steps: [
      { title: "Choose Length", description: "Slide to select your desired character length (from 6 to 64)." },
      { title: "Set Characters", description: "Toggle uppercase, lowercase, digits, and special symbols." },
      { title: "Analyze Strength", description: "Check the real-time strength feedback bar and entropy score." },
      { title: "Copy Password", description: "Click the copy button and paste safely into your password manager." }
    ],
    faqs: [
      { question: "Are these passwords safe?", answer: "Yes, the passwords are generated using secure client-side pseudorandom number generators (PRNG) and never sent across the internet." },
      { question: "What makes a password strong?", answer: "A length of 12-16+ characters combining uppercase, lowercase, numbers, and special symbols creates high entropy, making it nearly impossible to crack." }
    ],
    relatedSlugs: ["sha256-generator", "base64-encoder"]
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter & text analyzer",
    shortDesc: "Count words, characters, sentences, paragraphs, and read time for any text.",
    category: "text",
    icon: "FileText",
    isPopular: false,
    isTrending: false,
    isLatest: false,
    titleTag: "Word Counter Online | Character, Line & Read Time Analyzer",
    metaDesc: "Count words, characters, sentences, and read time. Free online text analysis tool featuring real-time statistics, case converter, and keyword density checker.",
    h1Title: "Word Counter & Text Analyzer",
    introText: "Analyze your articles, essays, and social copy. Get precise real-time word count, character count, sentence count, reading difficulty estimate, and estimated reading time.",
    detailedGuide: "Simply type or paste your text into the area below. The counter updates immediately. Our text analyzer also calculates approximate reading times and sentence counts, which is perfect for SEO copywriters.",
    steps: [
      { title: "Paste Text", description: "Type or copy-paste your content into the text area." },
      { title: "Review Metrics", description: "Instantly check the word, character, and sentence counters." },
      { title: "Analyze Reading Stats", description: "Observe estimated read time and write-time pacing." },
      { title: "Clear or Copy", description: "Reset with a single click, or copy the modified text back." }
    ],
    faqs: [
      { question: "Are spaces included in the character count?", answer: "Our panel displays both 'Characters with spaces' and 'Characters without spaces' for ultimate precision." },
      { question: "Is there a text limit?", answer: "No, our client-side counters can handle extremely long texts, books, or scripts without lagging." }
    ],
    relatedSlugs: ["case-converter", "markdown-to-html"]
  },
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    shortDesc: "Instantly change text to UPPERCASE, lowercase, Title Case, sentence case, or slugify.",
    category: "text",
    icon: "Type",
    isPopular: false,
    isTrending: false,
    isLatest: false,
    titleTag: "Case Converter Online | Convert UPPERCASE, lowercase, Title Case",
    metaDesc: "Convert your text to any case format instantly. Supports Sentence case, Lower case, Upper case, Title Case, PascalCase, camelCase, and URL-friendly slugify.",
    h1Title: "Case Converter online tool",
    introText: "Format your text cases instantly. Helpful for developers formatting variables, writers fixing capitalization errors, and marketers creating title titles.",
    detailedGuide: "Input your text, choose your target format, and watch the converted text appear instantly. You can easily switch between normal reading formats and coding/URL variable cases.",
    steps: [
      { title: "Enter Text", description: "Paste or write the text you want to format." },
      { title: "Choose Case", description: "Select from Sentence case, UPPER, lower, Title, camelCase, or slugify." },
      { title: "Copy Output", description: "Copy the updated text with one click." }
    ],
    faqs: [
      { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of each major word, which is ideal for headings and book titles." },
      { question: "What does Slugify do?", answer: "It converts text into a URL-friendly format: lowercase, replaces spaces with hyphens, and removes special characters." }
    ],
    relatedSlugs: ["word-counter", "url-encoder"]
  },
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Smart Unit Converter",
    shortDesc: "Convert lengths, weight, temperature, data storage, speed, and area in real-time.",
    category: "converter",
    icon: "Scale",
    isPopular: false,
    isTrending: false,
    isLatest: false,
    titleTag: "Universal Unit Converter | Length, Weight & Data Converter",
    metaDesc: "Convert units of length, weight, temperature, speed, area, and digital storage. Easy-to-use sliders and accurate scientific converters.",
    h1Title: "Universal Unit Converter",
    introText: "Fast, accurate unit conversions across multiple systems. Convert metric to imperial, digital bits to gigabytes, or celsius to fahrenheit with real-time scaling.",
    detailedGuide: "Choose a measurement type (such as Length or Storage), select your input unit and value, and view the converted results across all popular alternative metrics instantly.",
    steps: [
      { title: "Choose Category", description: "Select Length, Weight, Temperature, Area, Speed, or Storage." },
      { title: "Enter Input", description: "Choose the source unit (e.g., meters, pounds) and enter the quantity." },
      { title: "View Conversions", description: "See the value converted across all target units instantly." },
      { title: "Copy Results", description: "Click the clipboard button next to any conversion output." }
    ],
    faqs: [
      { question: "Are digital data conversions base 10 or base 2?", answer: "We use standard binary storage conversions (1 KB = 1024 Bytes) for maximum scientific accuracy." },
      { question: "Are conversion values accurate?", answer: "Yes, values are calculated using high-precision floats matching standard scientific conversion formulas." }
    ],
    relatedSlugs: ["calculators", "color-picker"]
  },
  {
    id: "calculators",
    slug: "calculators",
    name: "Interactive Calculators",
    shortDesc: "Solve equations with our Scientific, Loan, BMI, and Age Calculators.",
    category: "calculator",
    icon: "Calculator",
    isPopular: true,
    isTrending: false,
    isLatest: false,
    titleTag: "Online Calculators | Loan, Scientific, BMI & Age Calculator",
    metaDesc: "Calculate loans, track body mass index, compute exact age, or use our interactive scientific calculator. High performance calculators with clean visuals.",
    h1Title: "Multi-Purpose Calculator Center",
    introText: "A centralized hub for everyday math, healthcare, and finance. Calculate mortgage repayments, find your body mass index, or count exact birthdays.",
    detailedGuide: "Choose your desired calculator. For the Loan Calculator, input your principal amount, interest rate, and term to see a monthly breakdown. For the Scientific Calculator, type equations directly on our beautiful custom visual keypads.",
    steps: [
      { title: "Select Calculator", description: "Choose Scientific, Loan (Mortgage), BMI, or Age Calculator." },
      { title: "Fill Variables", description: "Input numbers, loan rates, weight, height, or birth dates." },
      { title: "Observe Breakdown", description: "Check detailed charts, monthly costs, BMI categories, or total months." },
      { title: "Save / Clear", description: "Reset variables easily for rapid comparison recalculations." }
    ],
    faqs: [
      { question: "Is the loan interest compounded?", answer: "Our loan calculator uses standard amortization compounding formulas to determine monthly interest payments." },
      { question: "How does the BMI calculator categorize health?", answer: "It utilizes official WHO classifications: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (>=30)." }
    ],
    relatedSlugs: ["unit-converter", "developer-tools"]
  }
];

// Helper to resolve any slug (including 500+ virtual ones) to its core tool implementation and customized SEO data
export function getToolBySlug(slug: string): Tool | undefined {
  if (!slug) return undefined;
  
  // 1. Check exact match in core tools first
  const exactMatch = CORE_TOOLS.find(t => t.slug === slug);
  if (exactMatch) return exactMatch;

  // 2. Map virtual subcategory routes for Image Compressor
  if (slug === "image-compressor-100kb" || slug === "image-compressor-50kb" || slug === "image-compressor-20kb" || slug === "jpeg-compressor" || slug === "png-compressor") {
    const base = CORE_TOOLS.find(t => t.id === "image-compressor")!;
    const size = slug.includes("100kb") ? "100KB" : slug.includes("50kb") ? "50KB" : slug.includes("20kb") ? "20KB" : "custom sizes";
    const type = slug.includes("jpeg") ? "JPEG" : slug.includes("png") ? "PNG" : "images";
    
    return {
      ...base,
      slug: slug,
      name: `Image Compressor (${size || type})`,
      shortDesc: `Compress your ${type} online to under ${size || 'any size'} instantly for free.`,
      titleTag: `Compress Image to Under ${size || 'custom size'} | Online JPG & PNG Compressor`,
      metaDesc: `Reduce image size to less than ${size || 'custom limit'} free online. Optimize ${type} locally without losing quality. Mobile-first browser compressor.`,
      h1Title: `Online Image Compressor under ${size || 'any size'}`,
      introText: `Need to compress images for standard forms or web upload? Our compression optimizer shrinks your ${type} to under ${size || 'any size'} instantly, preserving sharp colors and resolution.`,
      faqs: [
        { question: `Will my image quality suffer when compressing to ${size}?`, answer: `No, our canvas optimizer calculates the exact mathematical scale and quality parameters to stay under ${size} while retaining visual clarity.` },
        ...base.faqs
      ]
    };
  }

  // 3. Map virtual subcategory routes for QR Code Generator
  if (slug === "qr-code-generator-for-whatsapp" || slug === "qr-code-generator-for-wifi" || slug === "qr-code-generator-for-vcard") {
    const base = CORE_TOOLS.find(t => t.id === "qr-code-generator")!;
    const type = slug.includes("whatsapp") ? "WhatsApp link" : slug.includes("wifi") ? "WiFi password sharing" : "Contact (vCard) cards";
    
    return {
      ...base,
      slug: slug,
      name: `QR Code Generator for ${type}`,
      shortDesc: `Create customizable, high-resolution QR codes for ${type} instantly.`,
      titleTag: `Free QR Code Generator for ${type} | Custom QR Toolkit`,
      metaDesc: `Make custom QR codes for ${type}. Customize foreground colors, scale resolutions, and download instantly. No limits or expiration.`,
      h1Title: `Custom QR Code Generator for ${type}`,
      introText: `Generate specific QR codes tailored for ${type}. Scan instantly with any smartphone camera to connect, message, or import details.`,
    };
  }

  // 4. Map virtual subcategory routes for Password Generator
  if (slug === "strong-password-generator" || slug === "random-password-generator" || slug === "secure-password-generator") {
    const base = CORE_TOOLS.find(t => t.id === "password-generator")!;
    return {
      ...base,
      slug: slug,
      name: "Strong Password Generator Pro",
      shortDesc: "Generate highly secure, randomized, and custom password strings to safeguard files.",
      titleTag: "Strong Password Generator | Free Cryptographically Secure Tool",
      metaDesc: "Create military-grade secure, random, high-entropy password strings. Fully customizable length, character sets, and instant local strength analysis.",
      h1Title: "Military-Grade Password Generator",
      introText: "Secure your login credentials. Generate maximum security keys client-side, protected against standard dictionary and brute-force cracking attempts.",
    };
  }

  // 5. Map virtual converter routes
  if (slug === "length-converter" || slug === "weight-converter" || slug === "temperature-converter" || slug === "speed-converter" || slug === "area-converter" || slug === "storage-converter") {
    const base = CORE_TOOLS.find(t => t.id === "unit-converter")!;
    const type = slug.split("-")[0];
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    return {
      ...base,
      slug: slug,
      name: `${capitalizedType} Unit Converter`,
      shortDesc: `Convert lengths, weights, or other values matching ${type} systems instantly.`,
      titleTag: `${capitalizedType} Converter Online | High Accuracy Conversion Tool`,
      metaDesc: `Convert standard metrics for ${type} online for free. Input values to receive instant conversions across metric and imperial systems.`,
      h1Title: `${capitalizedType} Conversion System`,
      introText: `Calculate precise metrics for ${type}. Swap between standard global units with sliding input parameters and zero lag.`,
    };
  }

  // 6. Map virtual code/dev tools
  if (slug === "jpg-to-png" || slug === "png-to-webp" || slug === "webp-to-jpg" || slug === "heic-to-jpg") {
    const base = CORE_TOOLS.find(t => t.id === "image-converter")!;
    const formats = slug.split("-to-");
    const fromFmt = formats[0].toUpperCase();
    const toFmt = formats[1].toUpperCase();
    return {
      ...base,
      slug: slug,
      name: `${fromFmt} to ${toFmt} Converter`,
      shortDesc: `Convert files from ${fromFmt} to ${toFmt} format in seconds.`,
      titleTag: `Convert ${fromFmt} to ${toFmt} Free Online | High Quality Converter`,
      metaDesc: `Convert ${fromFmt} to ${toFmt} format inside your browser. No files uploaded to server, 100% fast, free and secure.`,
      h1Title: `Online ${fromFmt} to ${toFmt} Converter`,
      introText: `Swap formats cleanly from ${fromFmt} format to web-ready ${toFmt} format. Scale, crop, or preserve dimensions in one run.`,
    };
  }

  // 7. Map virtual text configurations
  if (slug === "word-counter" || slug === "character-counter" || slug === "markdown-to-html" || slug === "html-to-markdown") {
    const base = CORE_TOOLS.find(t => t.id === "word-counter")!;
    const label = slug.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
    return {
      ...base,
      slug: slug,
      name: label,
      shortDesc: `Analyze strings and writeouts matching ${label} requirements.`,
      titleTag: `${label} Online | Free Text Optimization Utilities`,
      metaDesc: `Inspect letter count, space count, words count and structural parameters matching ${label}. Super fast and reliable.`,
      h1Title: `${label} Analyzer`,
      introText: `Easily evaluate copy, count variables, parse headers or convert scripts to match ${label} standards without server lag.`,
    };
  }

  // Default fallback to first matching category tools or sitemap list
  return undefined;
}
