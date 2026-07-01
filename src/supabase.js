import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqpiwufmoeffxvzxnolp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcGl3dWZtb2VmZnh2enhub2xwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY3MTM2OSwiZXhwIjoyMDk4MjQ3MzY5fQ.cI7KdUMi1zPrRGB2eLXxl8XBt3lPDpQOoNKOiW-nMNY'

export const supabase = createClient(supabaseUrl, supabaseKey)