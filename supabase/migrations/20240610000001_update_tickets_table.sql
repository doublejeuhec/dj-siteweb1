-- Update tickets table to support new ticket types and venues
ALTER TABLE tickets
DROP COLUMN IF EXISTS adult_tickets,
DROP COLUMN IF EXISTS student_tickets,
DROP COLUMN IF EXISTS child_tickets;

ALTER TABLE tickets
ADD COLUMN IF NOT EXISTS venue text,
ADD COLUMN IF NOT EXISTS hec_student_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS young_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS hec_staff_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS other_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS palais_hec_student_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS palais_young_tickets integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS palais_other_tickets integer DEFAULT 0;

-- Ensure the table is part of the realtime publication
alter publication supabase_realtime add table tickets;