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

DECLARE @user varchar(32);
DECLARE @defaultSchema varchar(32);
DECLARE @role varchar(32);
DECLARE @authorization varchar(32);
DECLARE @pass varchar(64);
DECLARE @test varchar(64);


SET @user = 'test_test';
SET @defaultSchema = 'logistics';
SET @role = 'LogisticsTestAppUser_Role';
SET @authorization = 'dbo';
SET @pass = '$(MSSQL_PASSWORD)';

--create @user user login
--create user in  database
--create role
--apply permissions to schemas
--ensure role membership is correct
--allow users to create tables in defaultSchema
--Allow user to connect to database
DECLARE @cmd nvarchar(max);
SET @cmd = 
'BEGIN
	
	CREATE LOGIN '+ @user + ' WITH PASSWORD=N''' + @pass + '''
	
	CREATE USER ' + @user + ' FOR LOGIN ' + @user + ' WITH DEFAULT_SCHEMA=' + @defaultSchema + '
	
	CREATE ROLE ' + @role + ' AUTHORIZATION ' + @authorization + '
	
	GRANT ALTER ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT CONTROL ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT SELECT ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT DELETE ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT INSERT ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT SELECT ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT UPDATE ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
  ALTER AUTHORIZATION ON SCHEMA::' + @defaultSchema + ' TO ' + @role + '
	
	GRANT REFERENCES ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	EXEC sp_addrolemember N''' + @role +''', ' + @user + '
	
	GRANT CREATE TABLE TO ' + @role + '
	
	GRANT CONNECT TO ' + @user +
' END';
-- PRINT(@cmd)
EXEC sp_executesql @cmd;

GO

CREATE TABLE [logistics].[customers] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds customers for shopping-cart-playground_test' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'customers'

CREATE TABLE [logistics].[products] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  product_name VARCHAR(100) NOT NULL,
  cost INT NOT NULL
);

-- CREATE UNIQUE INDEX products_product_name_idx ON  [logistics].[products](product_name);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds products for shopping-cart-playground_test' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'products'

CREATE TABLE [logistics].[purchases] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  product_id INT NOT NULL,
  transaction_id NVARCHAR(64) NOT NULL,
  quantity INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds purchases for shopping-cart-playground_test' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'purchases'

CREATE TABLE [logistics].[transactions] (
  id NVARCHAR(64) PRIMARY KEY CLUSTERED,
  customer_id INT NOT NULL,
  total INT NOT NULL,
  rewards_points INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds transactions for shopping-cart-playground_test' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'transactions'

ALTER TABLE [logistics].[purchases] ADD FOREIGN KEY (product_id) REFERENCES [logistics].[products](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [logistics].[purchases] ADD FOREIGN KEY (transaction_id) REFERENCES [logistics].[transactions](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [logistics].[transactions] ADD FOREIGN KEY (customer_id) REFERENCES [logistics].[customers](id) ON DELETE NO ACTION ON UPDATE CASCADE;
