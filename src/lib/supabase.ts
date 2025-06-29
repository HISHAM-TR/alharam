import { createClient } from '@supabase/supabase-js';

// تهيئة Supabase
const isDevelopment = import.meta.env.DEV;

// استخدام قيم من ملف البيئة أو قيم افتراضية للتطوير
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fake-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// في وضع التطوير، قد نستخدم محاكاة البيانات بدلاً من الاتصال الفعلي بـ Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
