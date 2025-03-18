-- This migration fixes the error where tickets table is already a member of supabase_realtime publication
-- Instead of trying to add it again, we'll just make sure the table exists and has the right structure

-- Make sure the tickets table has all the required fields
ALTER TABLE IF EXISTS tickets
  ADD COLUMN IF NOT EXISTS venue text,
  ADD COLUMN IF NOT EXISTS hec_student_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS young_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hec_staff_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS other_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS palais_hec_student_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS palais_young_tickets integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS palais_other_tickets integer DEFAULT 0;
