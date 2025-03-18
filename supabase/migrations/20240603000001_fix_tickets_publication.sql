-- First check if the table exists in the publication before trying to remove it
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'tickets'
  ) THEN
    -- Remove the table from the publication first
    ALTER PUBLICATION supabase_realtime DROP TABLE tickets;
  END IF;

  -- Then add it back to ensure it's properly configured
  ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
END
$$;