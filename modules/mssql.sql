CREATE TABLE [client]
(
	[id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[clientid] NVARCHAR(MAX) NULL,
	[clientsecret] NVARCHAR(MAX) NULL,
	[redirecturi] NVARCHAR(MAX) NULL,
	[isdisabled] BIT NULL DEFAULT 0,
	[isdeleted] BIT NULL DEFAULT 0,
    [datecreated] DATETIME NULL DEFAULT GETDATE(), 
    [dateupdated] DATETIME NULL DEFAULT GETDATE()
);

CREATE TABLE [user]
(
	[id] INT NOT NULL PRIMARY KEY IDENTITY,
	[clientid] NVARCHAR(MAX) NULL,
	[username] NVARCHAR(MAX) NULL,
	[password] NVARCHAR(MAX) NULL,
	[isactivated] BIT NULL DEFAULT 0,
	[isdisabled] BIT NULL DEFAULT 0,
	[isdeleted] BIT NULL DEFAULT 0,
    [datecreated] DATETIME NULL DEFAULT GETDATE(), 
    [dateupdated] DATETIME NULL DEFAULT GETDATE()
);

CREATE TABLE [token]
(	
	[id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[token] NVARCHAR(MAX) NULL,
	[tokentype] NVARCHAR(MAX) NULL,
	[clientid] NVARCHAR(MAX) NULL,
	[userid] INT NULL,
	[expires] DATETIME NULL,
	[isdisabled] BIT NULL DEFAULT 0,
	[isdeleted] BIT NULL DEFAULT 0,
    [datecreated] DATETIME NULL DEFAULT GETDATE(), 
    [dateupdated] DATETIME NULL DEFAULT GETDATE()
);

