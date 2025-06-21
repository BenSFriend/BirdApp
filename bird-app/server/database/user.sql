-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER bird_db_owner
WITH PASSWORD 'birds';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO bird_db_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO bird_db_owner;

CREATE USER bird_db_appuser
WITH PASSWORD 'birds';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO bird_db_appuser;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO bird_db_appuser;
