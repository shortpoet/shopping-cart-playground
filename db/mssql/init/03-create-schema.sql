 USE master;
 ALTER DATABASE playground SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
 DROP DATABASE playground;
 DROP USER test
 DROP ROLE LogisticsAppUser_Role
 DROP LOGIN test

IF DB_ID('playground') IS NOT NULL
  set noexec on               -- prevent creation when already exists

CREATE DATABASE playground;
GO

USE playground;

GO

CREATE SCHEMA logistics;

GO