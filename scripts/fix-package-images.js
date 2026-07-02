const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 1. Check dry-run flag
const isDryRun = process.argv.includes('--dry-run');

// 2. Parse .env.local manually to load credentials if file exists
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('#')) return;
    const parts = cleanLine.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  });
}

// 3. Select Supabase Key (Service Role Key preferred, falls back to Anon Key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

const keyToUse = serviceRoleKey || anonKey;
if (!serviceRoleKey) {
  console.warn('WARNING: SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables or .env.local.');
  console.warn('Falling back to NEXT_PUBLIC_SUPABASE_ANON_KEY (which might fail if Row Level Security is active for writes).');
} else {
  console.log('SUPABASE_SERVICE_ROLE_KEY is successfully loaded from environment/local settings.');
}

const supabase = createClient(supabaseUrl, keyToUse);

async function main() {
  console.log('Connecting to Supabase at:', supabaseUrl);
  if (isDryRun) {
    console.log('=== DRY RUN MODE: No updates will be committed to the database ===');
  }

  // 1. Fetch the exact packages first to get their UUID IDs (avoiding fragile text matching during update)
  const { data: packages, error: fetchError } = await supabase
    .from('packages')
    .select('id, title, image');

  if (fetchError) {
    console.error('Error fetching packages from schema cache:', fetchError.message);
    if (fetchError.message.includes("schema cache")) {
      console.warn('\nNote: This table does not exist yet on this Supabase instance.');
      console.warn('The codebase fallback packages in `lib/packages-data.ts` will be used instead.');
    }
    return;
  }

  const updates = [
    {
      title: 'Tirupati Balaji (Andhra Pradesh)',
      newImage: 'https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=800&q=80&auto=format&fit=crop'
    },
    {
      title: 'Rameshwaram (Tamil Nadu)',
      newImage: 'https://images.unsplash.com/photo-1683665446527-0bfa0d7a8822?w=800&q=80&auto=format&fit=crop'
    }
  ];

  for (const updateConfig of updates) {
    const pkg = packages.find(p => p.title === updateConfig.title);
    if (!pkg) {
      console.log(`Package not found in database: "${updateConfig.title}"`);
      continue;
    }

    console.log(`\nFound Package:`);
    console.log(`  ID:    ${pkg.id}`);
    console.log(`  Title: ${pkg.title}`);
    console.log(`  Old:   ${pkg.image}`);
    console.log(`  New:   ${updateConfig.newImage}`);

    if (isDryRun) {
      console.log(`  [DRY-RUN]: Would execute: UPDATE packages SET image = '${updateConfig.newImage}' WHERE id = '${pkg.id}'`);
    } else {
      console.log(`  Updating row in database using exact WHERE clause: WHERE id = '${pkg.id}'...`);
      const { error: updateError } = await supabase
        .from('packages')
        .update({ image: updateConfig.newImage })
        .eq('id', pkg.id);

      if (updateError) {
        console.error(`  Error updating row:`, updateError.message);
      } else {
        console.log(`  Successfully updated row!`);
      }
    }
  }
}

main();
