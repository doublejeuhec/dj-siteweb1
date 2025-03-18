-- First update existing null values with defaults
UPDATE users SET join_year = 2020 WHERE join_year IS NULL;
UPDATE users SET phone_number = 'Non renseigné' WHERE phone_number IS NULL;
UPDATE users SET profession = 'Non renseigné' WHERE profession IS NULL;

-- Now we can safely set the columns to NOT NULL
ALTER TABLE users ALTER COLUMN join_year SET NOT NULL;
ALTER TABLE users ALTER COLUMN phone_number SET NOT NULL;
ALTER TABLE users ALTER COLUMN profession SET NOT NULL;

-- Set default value for is_former_member
ALTER TABLE users ALTER COLUMN is_former_member SET DEFAULT true;

-- Update any existing records to have is_former_member = true
UPDATE users SET is_former_member = true WHERE is_former_member IS NULL OR is_former_member = false;