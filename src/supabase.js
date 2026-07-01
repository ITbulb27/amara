import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqpiwufmoeffxvzxnolp.supabase.co'
const supabaseKey = 'PASTE_ANON_KEY_DIRI'

export const supabase = createClient(supabaseUrl, supabaseKey)