var model = module.exports;

var sql = require('mssql');

/*
 * Required
 */

model.getAccessToken = function (bearerToken, callback) {
	console.log(bearerToken);
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlGetToken = "select * from token where token = '" + bearerToken + "' and tokentype = 'access';";
		return pool.request()
		.query(sqlGetToken)
	}).then(result => {
		sql.close();
		let token = result.recordsets[0][0];
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
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(false, false);
	});
};

model.getRefreshToken = function (bearerToken, callback) {
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlGetToken = "select * from token where token = '" + bearerToken + "' and tokentype = 'refresh';";
		return pool.request()
		.query(sqlGetToken)
	}).then(result => {
		sql.close();
		let token = result.recordsets[0][0];
		if (token) {
			return callback(false, {
				refreshToken: token.token,
				clientId: token.clientid,
				userId: token.userid,
				expires: token.expires
			});
		} else {
			callback(false, false);
		}
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(false, false);
	});
};

model.getClient = function (clientId, clientSecret, callback) {
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlGetClient = "select * from client where clientid = '" + clientId + "' and clientsecret = '" + clientSecret + "';";
		return pool.request()
		.query(sqlGetClient)
	}).then(result => {
		sql.close();
		let client = result.recordsets[0][0];
		if (client) {
			return callback(false, {
				clientId : client.clientid,
				clientSecret: client.clientsecret,
				redirectUri: client.redirecturi
			});
		} else {
			callback(false, false);
		}
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(false, false);
	});
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
	// authorizedClientIds[grantType] && authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0
	callback(false, true);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlClearToken = "delete from token where tokentype = 'access' and clientid = '" + clientId + "' and userid = " + userId.id + ";";
		let sqlAddToken = "insert into token(token, tokentype, clientid, userid, expires) values('" + accessToken + "', 'access', '" + clientId + "', " + userId.id + ", '" + expires.toISOString() + "');";
		console.log(sqlAddToken);
		return pool.request()
		.query(sqlClearToken + sqlAddToken)
	}).then(result => {
		sql.close();
		callback(false);
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(true);
	});
};

model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlClearToken = "delete from token where tokentype = 'refresh' and clientid = '" + clientId + "' and userid = " + userId.id + ";";
		let sqlAddToken = "insert into token(token, tokentype, clientid, userid, expires) values('" + refreshToken + "', 'refresh', '" + clientId + "', " + userId.id + ", '" + expires.toISOString() + "');";
		return pool.request()
		.query(sqlClearToken + sqlAddToken)
	}).then(result => {
		sql.close();
		callback(false);
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(true);
	});
};

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
	new sql.ConnectionPool(global.conn).connect().then(pool => {
		let sqlGetUser = "select * from [user] where [username] = '" + username + "' and [password] = '" + password + "' and isactivated = 1 and isdeleted = 0 and isdisabled = 0;";
		return pool.request()
		.query(sqlGetUser)
	}).then(result => {
		sql.close();
		let user = result.recordsets[0][0];
		if (user) {
			return callback(false, {
				id : user.id,
				username: user.username,
				password: user.password
			});
		} else {
			callback(false, false);
		}
	}).catch(err => {
		// ... error checks 
		console.log(err);
		sql.close();
		callback(false, false);
	});
};

