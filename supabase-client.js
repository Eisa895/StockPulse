import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://artyddpgtnbkdyybponr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydHlkZHBndG5ia2R5eWJwb25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODQzNjIsImV4cCI6MjA3NTk2MDM2Mn0.S9L7zFmmbUzZVl8kBO9ld7x4ShJFUZvkbeg_W6VJnjM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
