CREATE TABLE [Logistics].[customers] (
  id INT PRIMARY KEY CLUSTERED,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) CHECK(DATALENGTH(password) > 9) NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON  [Logistics].[customer](username);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds customers for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'Logistics', 
@level1type=N'TABLE',@level1name=N'customers'

CREATE TABLE [Logistics].[products] (
  id INT PRIMARY KEY CLUSTERED,
  cost INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds products for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'Logistics', 
@level1type=N'TABLE',@level1name=N'products'

CREATE TABLE [Logistics].[purchases] (
  id INT PRIMARY KEY CLUSTERED,
  product_id INT NOT NULL,
  quantity INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds purchases for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'Logistics', 
@level1type=N'TABLE',@level1name=N'purchases'

CREATE TABLE [Logistics].[transactions] (
  id INT PRIMARY KEY CLUSTERED,
  customer_id INT NOT NULL,
  rewards_points INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds transactions for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'Logistics', 
@level1type=N'TABLE',@level1name=N'transactions'

CREATE TABLE [Logistics].[transaction_purchases] (
  id INT PRIMARY KEY CLUSTERED,
  transaction_id INT NOT NULL,
  purchase_id INT NOT NULL
);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds the join table for purchases per transactions for shopping-cart-playground' , @level0type=N'SCHEMA',@level0name=N'Logistics', 
@level1type=N'TABLE',@level1name=N'transaction_purchases'


ALTER TABLE [Logistics].[purchases] ADD FOREIGN KEY (product_id) REFERENCES [Logistics].[products](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Logistics].[transactions] ADD FOREIGN KEY (customer_id) REFERENCES [Logistics].[customers](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Logistics].[transaction_purchases] ADD FOREIGN KEY (transaction_id) REFERENCES [Logistics].[transactions](id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Logistics].[transaction_purchases] ADD FOREIGN KEY (purchase_id) REFERENCES [Logistics].[purchases](id) ON DELETE NO ACTION ON UPDATE CASCADE;
