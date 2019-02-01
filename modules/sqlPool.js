
var mysql = require('mysql');
var sqlPool  = mysql.createPool({
    multipleStatements: true,
    connectionLimit : 100,
    host            : '127.0.0.1',
    //host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'dbname'
});
module.exports = sqlPool;
