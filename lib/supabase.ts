import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvohmpihbfawebqmjsyx.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b2htcGloYmZhd2VicW1qc3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNTE2OTMsImV4cCI6MjAwMDcyNzY5M30.IDcNetHhu_oWre0BNokvYWVzhLz9rKA3r6_orwTyEco'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
