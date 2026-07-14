import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqpiwufmoeffxvzxnolp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcGl3dWZtb2VmZnh2enhub2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzEzNjksImV4cCI6MjA5ODI0NzM2OX0.iG7lOhdBXyV0S4TLTHRlkQKHo0igl2Xa2utdHpXjXB0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)