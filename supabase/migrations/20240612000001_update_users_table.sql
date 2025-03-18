ALTER TABLE public.users ADD COLUMN IF NOT EXISTS join_year INTEGER;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_former_member BOOLEAN DEFAULT FALSE;

alter publication supabase_realtime add table users;