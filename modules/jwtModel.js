var jwt = require('jsonwebtoken');

var model = module.exports;

model.getAccessToken = function (bearerToken, callback) {
  jwt.verify(bearerToken, global.jwtSecret, function(err, decoded) {
    if (!err) {
      console.log(bearerToken);
      console.log(decoded);
      console.log(new Date(decoded.exp * 1000));
      return callback(false, {
        clientId: decoded.clientId,
        userId: decoded.userId,
        expires: new Date(decoded.exp * 1000)
      });
    } else {
      callback(err, false);
    }
  });
};

model.getRefreshToken = function (bearerToken, callback) {
  jwt.verify(bearerToken, global.jwtSecret, function(err, decoded) {
    if (!err) {
      console.log(bearerToken);
      return callback(false, {
        clientId: decoded.clientId,
        userId: decoded.userId,
        expires: new Date(decoded.iat)
      });
    } else {
      callback(false, false);
    }
  });
};

model.getClient = function (clientId, clientSecret, callback) {
  global.sqlPool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res.send({
        code: 5000,
        data: {
          message: err
        },
      });
    } else {
      let sqlGetClient = "select * from client where clientid = '" + clientId + "' and clientsecret = '" + clientSecret + "';";
      connection.query(sqlGetClient, function (error, results, fields) {
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
        connection.release();
      });
    }
  });
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
  //authorizedClientIds[grantType] && authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0
  callback(false, true);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
  callback(false);
};

model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
  callback(false);
};

model.generateToken = function (type, req, callback) {
  let payload = {
    clientId: req.oauth.client.clientId,
    userId: req.user.id
  };
  jwt.sign(payload, global.jwtSecret, { expiresIn: global.jwtExpiresIn }, function(err, token) {
    if (!err) {
      callback(false, token);
    } else {
      console.log(err);
      callback(err);
    }
  });
};

/*
* Required to support password grant type
*/
model.getUser = function (username, password, callback) {  
  global.sqlPool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res.send({
          code: 5000,
          data: {
              message: err
          },
      });
    } else {
      let sqlGetUser = "select * from user where username = '" + username + "' and password = '" + password + "' and isactivated = 1 and isdeleted = 0 and isdisabled = 0;";
      connection.query(sqlGetUser, function (error, results, fields) {
        if (!error) {
          let user = results[0];
          console.log(user);
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
        connection.release();
      });
    }
  });
};