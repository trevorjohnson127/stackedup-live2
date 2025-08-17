// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bneduajkhvdlncvsyysh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZWR1YWpraHZkbG5jdnN5c3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTY1MDksImV4cCI6MjA2OTc3MjUwOX0.KnipLHqelIu_2G2YQnbCz0do-mnwP9l4TEUkKWkGvmE'; // Replace with your actual anon key from Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);
