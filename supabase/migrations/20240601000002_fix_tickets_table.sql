-- Fix tickets table policies to remove is_admin check
DROP POLICY IF EXISTS "Users can view their own tickets" ON tickets;
CREATE POLICY "Users can view their own tickets"
  ON tickets FOR SELECT
  USING (auth.uid() = user_id);

-- Add admin policy separately if needed in the future
-- For now, just ensure basic functionality works
DROP POLICY IF EXISTS "Public access to tickets" ON tickets;
CREATE POLICY "Public access to tickets"
  ON tickets FOR SELECT
  USING (payment_status = 'completed');
