const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

const files = [
  'app/holidays/holidays-content.tsx',
  'app/hotels/hotels-content.tsx',
  'app/flights/flights-content.tsx',
  'app/railways/railways-content.tsx',
  'app/events/events-content.tsx'
];

files.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove useParallaxZoom import
    content = content.replace(/import \{ useParallaxZoom \} from "@\/hooks\/use-parallax-zoom"\r?\n/g, '');
    
    // Remove hook calls
    content = content.replace(/const heroBgRef = useParallaxZoom\([^)]+\)\r?\n\s*const heroContentRef = useParallaxZoom\([^)]+\)\r?\n/g, '');
    
    // Unwrap the divs
    content = content.replace(/<div className="relative overflow-hidden" style=\{\{ background: '#1B4332' \}\}>\r?\n\s*<div ref=\{heroBgRef\}[^>]+>\s*<\/div>\r?\n\s*<div ref=\{heroContentRef\} className="relative z-10">\r?\n\s*<div className="pt-32 pb-16 px-4">/g, '<div className="bg-[#1B4332] pt-32 pb-16 px-4">');
    
    // Remove the two closing divs
    content = content.replace(/<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>/g, '</div>\n        </div>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted ${file}`);
  }
});
