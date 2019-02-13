CREATE DATABASE db DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE TABLE `client` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `clientid` varchar(20) DEFAULT NULL,
    `clientsecret` varchar(20) DEFAULT NULL,
    `redirecturi` varchar(200) DEFAULT NULL,
    `isdisabled` tinyint(4) DEFAULT '0',
    `isdeleted` tinyint(4) DEFAULT '0',
    `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
    `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `clientid_index` (`clientid`),
    KEY `clientsecret_index` (`clientsecret`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `token` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `token` varchar(200) DEFAULT NULL,
    `tokentype` varchar(50) DEFAULT NULL,
    `clientid` varchar(20) DEFAULT NULL,
    `userid` int(11) DEFAULT NULL,
    `expires` datetime DEFAULT NULL,
    `isdisabled` tinyint(4) DEFAULT '0',
    `isdeleted` tinyint(4) DEFAULT '0',
    `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
    `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `userid_index` (`userid`),
    KEY `token_index` (`token`),
    KEY `tokentype_index` (`tokentype`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `clientid` varchar(20) DEFAULT NULL,
    `wechatopenid` varchar(100) DEFAULT NULL,
    `wechatnickname` varchar(100) DEFAULT NULL,
    `wechatavatarurl` varchar(200) DEFAULT NULL,
    `username` varchar(100) DEFAULT NULL,
    `email` varchar(200) DEFAULT NULL,
    `password` varchar(100) DEFAULT NULL,
    `isactivated` tinyint(4) DEFAULT '1',
    `isdisabled` tinyint(4) DEFAULT '0',
    `isdeleted` tinyint(4) DEFAULT '0',
    `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
    `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `wechatopenid_index` (`wechatopenid`),
    KEY `email_index` (`email`),
    KEY `username_index` (`username`),
    KEY `clientid_index` (`clientid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `client` (clientid, clientsecret) VALUES ('wilsonwu', 'lookingforjob');
INSERT INTO `user` (clientid, username, password) VALUES ('wilsonwu', 'iwilsonwu', 'architect');

