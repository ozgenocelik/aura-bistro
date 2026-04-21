// Vercel deployment requires these as environment variables.
// For a pure static HTML site, you can set these manually or use a build step.
// If using Vercel without a build step, you'll need to paste your keys here.
// DO NOT COMMIT REAL KEYS TO PUBLIC REPOS!

window.SUPABASE_URL = 'https://toihcliuemkaszllgyok.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_bgrEcg0ktlQAkD9ja0v0ug_JL_xiTd7';

// Initialize Supabase.
window.supabaseClient = (typeof window.supabase !== 'undefined') 
    ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY) 
    : null;


