CREATE DATABASE db DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE TABLE client
(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	`clientid` LONGTEXT NULL,
	`clientsecret` LONGTEXT NULL,
	`redirecturi` LONGTEXT NULL,
	`isdisabled` TINYINT NULL DEFAULT 0,
	`isdeleted` TINYINT NULL DEFAULT 0,
	`datecreated` DATETIME NULL DEFAULT NOW(), 
	`dateupdated` DATETIME NULL DEFAULT NOW()
);

CREATE TABLE token
(	
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    `token` LONGTEXT NULL,
    `tokentype` LONGTEXT NULL,
    `clientid` LONGTEXT NULL,
    `userid` INT NULL,
    `expires` DATETIME NULL,
    `isdisabled` TINYINT NULL DEFAULT 0,
    `isdeleted` TINYINT NULL DEFAULT 0,
    `datecreated` DATETIME NULL DEFAULT NOW(), 
    `dateupdated` DATETIME NULL DEFAULT NOW()
);

CREATE TABLE user
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `clientid` LONGTEXT NULL,
    `wechatopenid` LONGTEXT NULL,
    `wechatnickname` LONGTEXT NULL,	
    `wechatavatarurl` LONGTEXT NULL,	
    `username` LONGTEXT NULL,
    `password` LONGTEXT NULL,
    `isactivated` TINYINT NULL DEFAULT 1,
    `isdisabled` TINYINT NULL DEFAULT 0,
    `isdeleted` TINYINT NULL DEFAULT 0,
    `datecreated` DATETIME NULL DEFAULT NOW(), 
    `dateupdated` DATETIME NULL DEFAULT NOW()
);
