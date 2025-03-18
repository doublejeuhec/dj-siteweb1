-- Create tickets table if it doesn't exist
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  show_date TIMESTAMP WITH TIME ZONE NOT NULL,
  adult_tickets INTEGER DEFAULT 0,
  student_tickets INTEGER DEFAULT 0,
  child_tickets INTEGER DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT NOT NULL,
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own tickets" ON tickets;
CREATE POLICY "Users can view their own tickets"
  ON tickets FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE email IN (
      SELECT email FROM users WHERE email = customer_email
    )
  ));

DROP POLICY IF EXISTS "Admin users can view all tickets" ON tickets;
CREATE POLICY "Admin users can view all tickets"
  ON tickets FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin users can insert tickets" ON tickets;
CREATE POLICY "Admin users can insert tickets"
  ON tickets FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can update tickets" ON tickets;
CREATE POLICY "Admin users can update tickets"
  ON tickets FOR UPDATE
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
