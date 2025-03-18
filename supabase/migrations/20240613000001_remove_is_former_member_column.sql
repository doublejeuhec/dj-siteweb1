-- This migration removes the is_former_member column since all users are former members
-- Note: We're not actually removing the column to avoid breaking existing code,
-- but we're setting a default value of true for all new records

ALTER TABLE users ALTER COLUMN is_former_member SET DEFAULT true;
ALTER TABLE users ALTER COLUMN join_year SET NOT NULL;
ALTER TABLE users ALTER COLUMN phone_number SET NOT NULL;
ALTER TABLE users ALTER COLUMN profession SET NOT NULL;

-- Update any existing records to have is_former_member = true
UPDATE users SET is_former_member = true WHERE is_former_member IS NULL OR is_former_member = false;
