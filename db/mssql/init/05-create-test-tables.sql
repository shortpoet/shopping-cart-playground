
CREATE TABLE [logistics].[customers] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds customers for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'customers'

CREATE TABLE [logistics].[products] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  product_name VARCHAR(100) NOT NULL,
  cost INT NOT NULL
);

-- CREATE UNIQUE INDEX products_product_name_idx ON  [logistics].[products](product_name);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds products for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'products'

CREATE TABLE [logistics].[purchases] (
  id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
  product_id INT NOT NULL,
  transaction_id NVARCHAR(64) NOT NULL,
  quantity INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds purchases for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'purchases'

CREATE TABLE [logistics].[transactions] (
  id NVARCHAR(64) PRIMARY KEY CLUSTERED,
  customer_id INT NOT NULL,
  total INT NOT NULL,
  rewards_points INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds transactions for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'logistics', 
@level1type=N'TABLE',@level1name=N'transactions'

ALTER TABLE [logistics].[purchases] ADD FOREIGN KEY (product_id) REFERENCES [logistics].[products](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [logistics].[purchases] ADD FOREIGN KEY (transaction_id) REFERENCES [logistics].[transactions](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [logistics].[transactions] ADD FOREIGN KEY (customer_id) REFERENCES [logistics].[customers](id) ON DELETE NO ACTION ON UPDATE CASCADE;
