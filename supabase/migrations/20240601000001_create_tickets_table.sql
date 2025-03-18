-- Create tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  show_date TIMESTAMP WITH TIME ZONE NOT NULL,
  adult_tickets INTEGER NOT NULL DEFAULT 0,
  student_tickets INTEGER NOT NULL DEFAULT 0,
  child_tickets INTEGER NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own tickets" ON tickets;
CREATE POLICY "Users can view their own tickets"
  ON tickets FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public access to tickets" ON tickets;
CREATE POLICY "Public access to tickets"
  ON tickets FOR SELECT
  USING (payment_status = 'completed');

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;