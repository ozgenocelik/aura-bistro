const fs = require('fs');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

const content = `
window.SUPABASE_URL = '${url}';
window.supabaseKey = '${key}';
window.SUPABASE_ANON_KEY = '${key}';

window.supabaseClient = (typeof window.supabase !== 'undefined') 
    ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY) 
    : null;
`;

fs.writeFileSync('config.js', content.trim());
console.log('Automated configuration injected from environment variables successfully.');
