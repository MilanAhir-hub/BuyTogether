IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'IIS AppPool\BuyTogether')
BEGIN
    CREATE LOGIN [IIS AppPool\BuyTogether] FROM WINDOWS;
END
GO
USE [BuyTogether];
IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'IIS AppPool\BuyTogether')
BEGIN
    CREATE USER [IIS AppPool\BuyTogether] FOR LOGIN [IIS AppPool\BuyTogether];
END
GO
ALTER ROLE [db_owner] ADD MEMBER [IIS AppPool\BuyTogether];
GO
