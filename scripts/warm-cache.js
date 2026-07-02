const https = require('https');

const fetchUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ data, headers: res.headers }));
    }).on('error', () => resolve(null));
  });
};

(async () => {
  const baseUrl = 'https://tea-country-holidays.vercel.app';
  console.log(`Warming up HTML page cache for ${baseUrl}...`);
  
  // 1. Fetch homepage HTML
  const pageResult = await fetchUrl(baseUrl);
  if (!pageResult) {
    console.error("Failed to fetch homepage.");
    return;
  }
  console.log(`Homepage fetched. Cache status: ${pageResult.headers['x-vercel-cache'] || 'N/A'}`);
  
  // 2. Find all Next.js optimized image URLs in the HTML
  const html = pageResult.data;
  const imageUrls = [];
  
  // Regex to match src and srcset urls that are next optimized
  const nextImageRegex = /(\/_next\/image\?[^"'\s,>]+)/g;
  let match;
  while ((match = nextImageRegex.exec(html)) !== null) {
    // Unescape HTML entities
    const cleanUrl = match[1].replace(/&amp;/g, '&');
    if (!imageUrls.includes(cleanUrl)) {
      imageUrls.push(cleanUrl);
    }
  }

  console.log(`Found ${imageUrls.length} optimized image assets to warm up.`);
  
  // 3. Fetch each optimized image URL to populate Vercel edge cache
  for (const imgUrl of imageUrls) {
    const fullUrl = `${baseUrl}/${imgUrl}`;
    console.log(`Warming image: ${imgUrl.substring(0, 80)}...`);
    const imgResult = await fetchUrl(fullUrl);
    if (imgResult) {
      console.log(`  Done. Cache: ${imgResult.headers['x-vercel-cache'] || 'N/A'}, Length: ${imgResult.data.length} bytes`);
    }
  }
  
  console.log("Cache warming completed successfully.");
})();
