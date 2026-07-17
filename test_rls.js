const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key && val) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey || !anonKey) {
  console.error("Missing credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const anonClient = createClient(supabaseUrl, anonKey);

async function checkPolicies() {
  console.log("Checking RLS Policies on referrals table...");
  
  console.log("\n1. Testing insert with ANON client...");
  const { data: anonData, error: anonError } = await anonClient
    .from('referrals')
    .insert({
      referrer_id: 'b32e351c-41ee-4ce0-a613-38b3ac57b1ed',
      referred_user_id: '97fbad91-2ce8-4698-976e-435fb6c3a623',
      status: 'completed'
    })
    .select();
    
  console.log("  Anon Insert Result Error:", anonError ? anonError.message : "None (Success)");
  console.log("  Anon Insert Result Data:", anonData);
}

checkPolicies();
