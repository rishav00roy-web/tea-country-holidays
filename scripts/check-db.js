const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Manually parse .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables!");
    return;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    
    // Check tables
    const tables = ["packages", "hotels", "blog_posts", "faqs", "reviews", "profiles", "site_settings"];
    
    console.log("=== Table Row Counts (Bypassing RLS) ===");
    for (const table of tables) {
      const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) {
        console.log(`${table}: ERROR - ${error.message}`);
      } else {
        console.log(`${table}: ${count} rows`);
      }
    }
    
    console.log("\n=== Profiles ===");
    const { data: profiles, error: pError } = await supabase.from("profiles").select("*");
    if (pError) {
      console.log("Error fetching profiles:", pError.message);
    } else {
      console.log(profiles);
    }
  } catch (err) {
    console.error("Execution error:", err.message);
  }
}

main();
