import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqpiwufmoeffxvzxnolp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcGl3dWZtb2VmZnh2enHub2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMTM2MjIsImV4cCI6MjA2Njc4OTYyMn0.your_actual_key'

export const supabase = createClient(supabaseUrl, supabaseKey)