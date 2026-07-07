export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface Tool {
  id: string; // e.g. "qr-code-generator"
  slug: string; // e.g. "qr-code-generator"
  name: string;
  shortDesc: string;
  category: string;
  icon: string; // Lucide icon name
  isPopular?: boolean;
  isTrending?: boolean;
  isLatest?: boolean;
  isAiPowered?: boolean;
  
  // SEO content
  titleTag: string;
  metaDesc: string;
  h1Title: string;
  introText: string;
  detailedGuide: string;
  steps: StepItem[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
}
