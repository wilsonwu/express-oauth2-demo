var model = module.exports;

function js_yyyy_mm_dd_hh_mm_ss (datetime) {
    let year = "" + datetime.getFullYear();
    let month = "" + (datetime.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    let day = "" + datetime.getDate(); if (day.length == 1) { day = "0" + day; }
    let hour = "" + datetime.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    let minute = "" + datetime.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    let second = "" + datetime.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

model.getAccessToken = function (bearerToken, callback) {
	global.sqlPool.getConnection(function (err, connection) {
		let sqlGetToken = "select * from token where token = '" + bearerToken + "' and tokentype = 'access';";
		connection.query(sqlGetToken, function (error, results, fields) {
            connection.release();
			if (!error) {
                let token = results[0];
                if (token) {
                    return callback(false, {
                        accessToken: token.token,
                        clientId: token.clientid,
                        userId: token.userid,
                        expires: token.expires
                    });
                } else {
                    callback(false, false);
                }
            } else {
				console.log(error);
                callback(false, false);
			}
		});
	});
};

model.getRefreshToken = function (bearerToken, callback) {
	global.sqlPool.getConnection(function (err, connection) {
		let sqlGetToken = "select * from token where token = '" + bearerToken + "' and tokentype = 'refresh';";
		connection.query(sqlGetToken, function (error, results, fields) {
            connection.release();
			if (!error) {
                let token = results[0];
                if (token) {
                    return callback(false, {
                        accessToken: token.token,
                        clientId: token.clientid,
                        userId: token.userid,
                        expires: token.expires
                    });
                } else {
                    callback(false, false);
                }
            } else {
				console.log(error);
                callback(false, false);
			}
		});
    });
};

model.getClient = function (clientId, clientSecret, callback) {
	global.sqlPool.getConnection(function (err, connection) {
		let sqlGetClient = "select * from client where clientid = '" + clientId + "' and clientsecret = '" + clientSecret + "';";
		connection.query(sqlGetClient, function (error, results, fields) {
            connection.release();
			if (!error) {
                let client = results[0];
                if (client) {
                    return callback(false, {
                        clientId : client.clientid,
                        clientSecret: client.clientsecret,
                        redirectUri: client.redirecturi
                    });
                } else {
                    callback(false, false);
                }
            } else {
				console.log(error);
                callback(false, false);
			}
		});
    });
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
	// authorizedClientIds[grantType] && authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0
	callback(false, true);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
    global.sqlPool.getConnection(function (err, connection) {
		let sqlClearToken = "delete from token where tokentype = 'access' and clientid = '" + clientId + "' and userid = " + userId.id + ";";
		let sqlAddToken = "insert into token(token, tokentype, clientid, userid, expires) values('" + accessToken + "', 'access', '" + clientId + "', " + userId.id + ", '" + js_yyyy_mm_dd_hh_mm_ss(expires) + "');";
		connection.query(sqlClearToken + sqlAddToken, function (error, results, fields) {
            connection.release();
			if (!error) {
                callback(false);
            } else {
				console.log(error);
                callback(true);
			}
		});
    });
};

model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
    global.sqlPool.getConnection(function (err, connection) {
		let sqlClearToken = "delete from onlytvb.token where tokentype = 'refresh' and clientid = '" + clientId + "' and userid = " + userId.id + ";";
		let sqlAddToken = "insert into onlytvb.token(token, tokentype, clientid, userid, expires) values('" + refreshToken + "', 'refresh', '" + clientId + "', " + userId.id + ", '" + js_yyyy_mm_dd_hh_mm_ss(expires) + "');";
		connection.query(sqlClearToken + sqlAddToken, function (error, results, fields) {
            connection.release();
			if (!error) {
                callback(false);
            } else {
				console.log(error);
                callback(true);
			}
		});
    });
};

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
    global.sqlPool.getConnection(function (err, connection) {
		let sqlGetUser = "select * from user where username = '" + username + "' and password = '" + password + "' and isactivated = 1 and isdeleted = 0 and isdisabled = 0;";
		connection.query(sqlGetUser, function (error, results, fields) {
            connection.release();
			if (!error) {
                let user = results[0];
                if (user) {
                    return callback(false, {
                        id : user.id,
                        username: user.username,
                        password: user.password
                    });
                } else {
                    callback(false, false);
                }
            } else {
				console.log(error);
                callback(false, false);
			}
		});
    });
};

