const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

const replacements = [
  {
    file: 'components/destinations.tsx',
    regex: /className="parallax-img-zoom /g,
    replacement: 'className="'
  },
  {
    file: 'components/blogs-section.tsx',
    regex: /className="parallax-img-zoom /g,
    replacement: 'className="'
  },
  {
    file: 'app/blog/[slug]/page.tsx',
    regex: /className="parallax-img-zoom /g,
    replacement: 'className="'
  },
  {
    file: 'components/bento-why-us.tsx',
    regex: /"use client";\r?\n\r?\nimport { Users, Star, MapPin, Award, Plane, Mountain } from "lucide-react";\r?\nimport { useParallaxZoom } from "@\/hooks\/use-parallax-zoom";/g,
    replacement: 'import { Users, Star, MapPin, Award, Plane, Mountain } from "lucide-react";'
  },
  {
    file: 'components/bento-why-us.tsx',
    regex: /const meshRef = useParallaxZoom\(\{ speed: 0.1, zoomFrom: 1.0, zoomTo: 1.05 \}\);\r?\n\r?\n  return \(\r?\n    <>\r?\n      \{\/\* Background bleed container: Sibling to section to prevent clipping by overflow-hidden \*\/}\r?\n      <div ref=\{meshRef\} className="absolute -inset-x-0 -inset-y-\[60px\] mesh-bg -z-10" \/>/g,
    replacement: 'return (\n    <>\n      {/* Background bleed container: Sibling to section to prevent clipping by overflow-hidden */}\n      <div className="absolute -inset-x-0 -inset-y-[60px] mesh-bg -z-10" />'
  },
  {
    file: 'components/masonry-testimonials.tsx',
    regex: /import \{ fallbackTestimonials \} from "@\/lib\/reviews-data";\r?\nimport \{ useParallaxZoom \} from "@\/hooks\/use-parallax-zoom";/g,
    replacement: 'import { fallbackTestimonials } from "@/lib/reviews-data";'
  },
  {
    file: 'components/masonry-testimonials.tsx',
    regex: /export default function MasonryTestimonials\(\{ initialTestimonials = fallbackTestimonials \}: \{ initialTestimonials\?: Testimonial\[\] \}\) \{\r?\n  const sectionRef = useParallaxZoom\(\{ speed: 0.06, zoomFrom: 1.0, zoomTo: 1.0 \}\);\r?\n\r?\n  return \(\r?\n    <section ref=\{sectionRef\} className="py-20 md:py-28 bg-\[#FAFAF7\] dark:bg-\[#0d1f1a\]">/g,
    replacement: 'export default function MasonryTestimonials({ initialTestimonials = fallbackTestimonials }: { initialTestimonials?: Testimonial[] }) {\n  return (\n    <section className="py-20 md:py-28 bg-[#FAFAF7] dark:bg-[#0d1f1a]">'
  },
  {
    file: 'app/faq/page.tsx',
    regex: /import FAQAccordion from "@\/components\/faq-accordion";\r?\nimport \{ Search \} from "lucide-react";\r?\nimport ParallaxHeroBanner from "@\/components\/parallax-hero-banner";/g,
    replacement: 'import FAQAccordion from "@/components/faq-accordion";\nimport { Search } from "lucide-react";'
  },
  {
    file: 'app/faq/page.tsx',
    regex: /<ParallaxHeroBanner bgColor="#1a3c2e" className="py-16 px-4 text-center">/g,
    replacement: '<section className="bg-[#1a3c2e] py-16 px-4 text-center">'
  },
  {
    file: 'app/faq/page.tsx',
    regex: /<\/ParallaxHeroBanner>/g,
    replacement: '</section>'
  },
  {
    file: 'app/faq/page.tsx',
    regex: /<ParallaxHeroBanner bgColor="#1a3c2e" className="py-12 px-4 text-center">/g,
    replacement: '<section className="bg-[#1a3c2e] py-12 px-4 text-center">'
  },
  {
    file: 'app/privacy/page.tsx',
    regex: /import type \{ Metadata \} from "next";\r?\nimport ParallaxHeroBanner from "@\/components\/parallax-hero-banner";/g,
    replacement: 'import type { Metadata } from "next";'
  },
  {
    file: 'app/privacy/page.tsx',
    regex: /<ParallaxHeroBanner bgColor="#1a3c2e" className="py-16 px-4 text-center">/g,
    replacement: '<section className="bg-[#1a3c2e] py-16 px-4 text-center">'
  },
  {
    file: 'app/privacy/page.tsx',
    regex: /<\/ParallaxHeroBanner>/g,
    replacement: '</section>'
  },
  {
    file: 'app/terms/page.tsx',
    regex: /import type \{ Metadata \} from "next";\r?\nimport ParallaxHeroBanner from "@\/components\/parallax-hero-banner";/g,
    replacement: 'import type { Metadata } from "next";'
  },
  {
    file: 'app/terms/page.tsx',
    regex: /<ParallaxHeroBanner bgColor="#1a3c2e" className="py-16 px-4 text-center">/g,
    replacement: '<section className="bg-[#1a3c2e] py-16 px-4 text-center">'
  },
  {
    file: 'app/terms/page.tsx',
    regex: /<\/ParallaxHeroBanner>/g,
    replacement: '</section>'
  }
];

replacements.forEach(({ file, regex, replacement }) => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted ${file}`);
  }
});
