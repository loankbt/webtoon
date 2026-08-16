-- Flyway migration: add `featured` column to `stories` as VARCHAR
-- Uses IF NOT EXISTS to be safe when re-running against newer MySQL versions

-- Use information_schema check and PREPARE/EXECUTE to be compatible across MySQL versions
SET @col_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'stories'
    AND COLUMN_NAME = 'featured'
);
SET @sql := IF(@col_exists = 0, 'ALTER TABLE `stories` ADD COLUMN `featured` VARCHAR(255)', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- End migration
