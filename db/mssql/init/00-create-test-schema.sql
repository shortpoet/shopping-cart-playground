USE master;
ALTER DATABASE playground_test SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE playground_test;

IF DB_ID('playground_test') IS NOT NULL
  set noexec on               -- prevent creation when already exists

CREATE DATABASE playground_test;
GO

USE playground_test;

GO

CREATE SCHEMA logistics;

GO