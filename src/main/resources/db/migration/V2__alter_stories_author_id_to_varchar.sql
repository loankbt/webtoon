-- Flyway migration: convert stories.author_id from a FK to a VARCHAR
-- Drops a foreign key and index on `author_id` if present, then modifies column type.

-- 1) Drop foreign key constraint referencing author_id (if any)
SET @fk_name := (
  SELECT CONSTRAINT_NAME
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'stories'
    AND COLUMN_NAME = 'author_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
  LIMIT 1
);
SET @sql := IF(@fk_name IS NOT NULL, CONCAT('ALTER TABLE `stories` DROP FOREIGN KEY `', @fk_name, '`'), 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2) Drop index on author_id if it exists (and is not PRIMARY)
SET @idx := (
  SELECT INDEX_NAME
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'stories'
    AND COLUMN_NAME = 'author_id'
  LIMIT 1
);
SET @sql2 := IF(@idx IS NOT NULL AND @idx != 'PRIMARY', CONCAT('ALTER TABLE `stories` DROP INDEX `', @idx, '`'), 'SELECT 1');
PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

-- 3) Change column type to VARCHAR(255)
ALTER TABLE `stories` MODIFY COLUMN `author_id` VARCHAR(255);

-- End migration
